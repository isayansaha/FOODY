import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EventsGateway } from '../events/events.gateway';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
  ) {}

  async processCheckout(customerId: string, restaurantId: string, items: { menuItemId: string; quantity: number }[]) {
    // 1. Fetch exact prices from the database (Zero-Trust Frontend)
    const menuItemIds = items.map(i => i.menuItemId);
    const dbItems = await this.prisma.menuItem.findMany({
      where: { id: { in: menuItemIds }, restaurantId }
    });

    if (dbItems.length !== items.length) {
      throw new BadRequestException('Invalid menu items provided or item does not belong to restaurant');
    }

    // 2. Calculate true total amount
    let totalAmount = 0;
    const orderItemsData = items.map(item => {
      const dbItem = dbItems.find(dbI => dbI.id === item.menuItemId)!;
      const price = dbItem.price;
      totalAmount += price * item.quantity;
      
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: price,
      };
    });

    // 3. Execute strict ACID Transaction
    // Create the Order and OrderItems simultaneously
    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          customerId,
          restaurantId,
          totalAmount,
          status: 'PENDING',
          items: {
            create: orderItemsData
          }
        },
        include: { items: true }
      });

      // (We would process payment via Stripe here)
      // If payment fails, throw Error, and the transaction automatically rolls back.
      const paymentSuccess = await this.mockPaymentGateway(totalAmount);
      if (!paymentSuccess) {
         throw new BadRequestException('Payment declined by processor');
      }

      // Update to PAID
      const paidOrder = await tx.order.update({
         where: { id: newOrder.id },
         data: { status: 'PAID' },
         include: { items: true }
      });

      const cartItemsForBroadcast = items.map(item => {
        const dbItem = dbItems.find(dbI => dbI.id === item.menuItemId)!;
        return `${item.quantity}x ${dbItem.name}`;
      });

      // INSTANT REAL-TIME SYNC: Broadcast the newly paid order to the Restaurant Owner
      this.eventsGateway.server.to(`restaurant_${restaurantId}`).emit('order:received', {
        id: paidOrder.id,
        displayId: `#${paidOrder.id.substring(0, 4)}`, // Simple mockup display ID
        status: paidOrder.status,
        time: 'Just now',
        items: cartItemsForBroadcast
      });

      return paidOrder;
    });

    return order;
  }

  private async mockPaymentGateway(amount: number): Promise<boolean> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate 95% success rate
    return Math.random() > 0.05;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, restaurantId: string) {
    // 1. Verify the order belongs to the restaurant
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new BadRequestException('Order not found');
    if (order.restaurantId !== restaurantId) throw new BadRequestException('Unauthorized');

    // 2. Update status in database
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    // 3. Broadcast to customer instantly
    this.eventsGateway.server.to(`user_${updatedOrder.customerId}`).emit('order:status_changed', {
      orderId: updatedOrder.id,
      status: updatedOrder.status,
    });

    return updatedOrder;
  }
}
