import { Controller, Post, Body, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  async checkout(
    @Req() req: any,
    @Body() body: { restaurantId: string; items: { menuItemId: string; quantity: number }[] }
  ) {
    const customerId = req.user.sub;
    return this.ordersService.processCheckout(customerId, body.restaurantId, body.items);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RESTAURANT, Role.ADMIN)
  async updateStatus(
    @Param('id') orderId: string,
    @Body('status') status: any,
    @Req() req: any,
  ) {
    // If admin, they could technically update any order, but for simplicity we'll pass their ID as restaurantId. 
    // The service currently expects restaurantId to match.
    const restaurantId = req.user.sub; 
    return this.ordersService.updateOrderStatus(orderId, status, restaurantId);
  }
}
