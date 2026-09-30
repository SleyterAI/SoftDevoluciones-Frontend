import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { OrderResponse } from '../../interfaces/order.interface';

export interface CompraItem {
  id: string;
  nroCompra: string;
  fecha: string;
  estado: 'Entregada' | 'En tránsito' | 'Procesando';
  total: number;
}

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  private router = inject(Router);
  private readonly orderService = inject(OrderService);

  readonly orderResource = rxResource({
    stream: () => this.orderService.getAllClientOrder()
  });


  getEstadoClass(estado: string): string {
    return estado === 'Entregada' ? 'badge success' : 'badge warning';
  }

  onDetailsClick(order: OrderResponse) {
      this.router.navigate(['/orders', order.order_id]);
  }
}
