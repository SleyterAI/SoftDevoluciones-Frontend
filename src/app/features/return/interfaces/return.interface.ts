import { ReturnDetailRequest } from "./return-detail.interface";

export interface ReturnRequest{
  reason: string;
  comment: string;
  quantity: number;
  orderDetail_id: number;
}

export interface ReturnEstadoRequest{
  estado: string;
}

export interface ReturnClientResponse{
  return_id: number;
  order_id: number;
  date: string;
  productsQuantity: number;
  status: string;
  returnTotal: number;
}

export interface ReturnAdminResponse{
  return_id: number;
  user_name: string;
  order_id: number;
  date: string;
  status: string;
  returnTotal: number;
}
