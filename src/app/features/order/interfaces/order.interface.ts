import { OrderDetailResponseDto } from './order-detail.interface';

export interface OrderResponse {
  //order
  order_id: number;
  order_phoneNumber: string;
  order_address: string;
  order_date: string;
  order_status: string;
  order_total: number;

  //user
  user_name: string;
  user_email: string;

  //order detail
  orderDetailResponseDto: OrderDetailResponseDto[];
}

export interface OrderSummaryResponse{
  //order
  order_id: number;
  order_phoneNumber: string;
  order_address: string;
  order_date: string;
  order_status: string;
  order_total: number;

  //user
  user_name: string;
  user_email: string;
}

export interface StatusRequest {
  order_status: string;
}
