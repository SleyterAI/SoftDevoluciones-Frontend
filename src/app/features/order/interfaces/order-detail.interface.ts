
export interface OrderDetailResponseDto{
  //order detail
  orderDetail_id: number;
  orderDetail_quantity: number;
  orderDetail_unitPrice: number;
  orderDetail_subTotal: number;

  //product
  product_id: number;
  product_name: string;
  product_imageUrl: string;

  //category
  category_name: string;


  //user
  user_name: string;
  user_email: string;

  //order
  order_phoneNumber: string;
  order_address: string;
  order_date: string;
  order_status: string;
  order_total: number;
}

export interface OrderDetForProduct {
  orderId: number;
  productId: number;
}
