import { Component, inject, input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AuthCookieService } from '../../../user/services/auth-cookie.service';
import { Router } from '@angular/router';
import { OrderResponse } from '../../interfaces/order.interface';

@Component({
  selector: 'app-orders',
  imports: [DecimalPipe, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);
  private readonly authCookieService = inject(AuthCookieService);

  order = input.required<OrderResponse>();

  readonly orderResource = rxResource({
    stream: () => this.orderService.getAllOrder()
  });

  getStatusClass(status: string): string {
  const normalized = status?.toLowerCase() || '';
  if (normalized.includes('entregada') || normalized.includes('aprobada')) return 'success';
  if (normalized.includes('tránsito') || normalized.includes('pendiente') || normalized.includes('revisión')) return 'warning';
  return 'primary';
}

onOrderClick() {
    const role = this.authCookieService.isAdmin();

    if (role) {
      this.router.navigate(['/admin/orders', this.order().order_id]);
    } else {
      console.warn('Not access');
    }
  }

}
