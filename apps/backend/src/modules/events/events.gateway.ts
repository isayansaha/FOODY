import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as cookie from 'cookie';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const cookies = client.handshake.headers.cookie;
      if (!cookies) throw new Error('No cookies found');

      const parsedCookies = cookie.parse(cookies);
      const token = parsedCookies['access_token'];
      if (!token) throw new Error('No access token found');

      const secret = this.configService.get<string>('JWT_SECRET', 'super-secret');
      const payload = this.jwtService.verify(token, { secret });

      // Join a personal room based on user ID for direct messaging
      client.join(`user_${payload.sub}`);
      
      // If restaurant, join a specific restaurant room to receive incoming orders
      if (payload.role === 'RESTAURANT') {
         client.join(`restaurant_${payload.sub}`);
      }

      console.log(`Client connected: ${client.id} - User: ${payload.sub}`);
    } catch (error) {
      console.log(`Unauthorized connection attempt: ${client.id}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('order:placed')
  handleOrderPlaced(client: Socket, payload: { restaurantId: string; orderId: string; items: any[] }) {
    // Forward the order instantly to the specific restaurant's room
    this.server.to(`restaurant_${payload.restaurantId}`).emit('order:received', {
      orderId: payload.orderId,
      items: payload.items,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('order:status_updated')
  handleOrderStatus(client: Socket, payload: { customerId: string; orderId: string; status: string }) {
    // Forward the status update directly to the customer
    this.server.to(`user_${payload.customerId}`).emit('order:status_changed', {
      orderId: payload.orderId,
      status: payload.status,
    });
  }

  @SubscribeMessage('driver:location')
  handleDriverLocation(client: Socket, payload: { customerId: string; lat: number; lng: number }) {
    // Stream driver coordinates to the customer watching the map
    this.server.to(`user_${payload.customerId}`).emit('driver:location_update', {
      lat: payload.lat,
      lng: payload.lng,
    });
  }
}
