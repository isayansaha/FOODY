export enum OrderStatus {
  PLACED = 'placed',
  ACCEPTED = 'accepted',
  PREPARING = 'preparing',
  READY = 'ready',
  PICKED_UP = 'picked_up',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  RESTAURANT = 'RESTAURANT',
  DRIVER = 'DRIVER'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: Location;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVegetarian: boolean;
  restaurantId: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  quantity: number;
  price: number;
  menuItem: MenuItem;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  driverId?: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  deliveryLocation: Location;
  createdAt: string;
  updatedAt: string;
}
