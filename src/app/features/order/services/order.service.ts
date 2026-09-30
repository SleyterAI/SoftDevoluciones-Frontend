import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponse } from '../interfaces/order.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/order`;

  //admin
  getAllOrder(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiUrl);
  }

  //admin and user
  getOrderById(id: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`);
  }

  getAllClientOrder(): Observable<OrderResponse[]>{
    return this.http.get<OrderResponse[]>(`${this.apiUrl}/my-orders`);
  }

}
