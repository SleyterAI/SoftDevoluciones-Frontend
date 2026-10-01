import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink, Router } from "@angular/router";
import { rxResource } from "@angular/core/rxjs-interop";
import { CommonModule, DecimalPipe } from "@angular/common";
import { OrderService } from "../../services/order.service";
import { OrderResponse } from "../../interfaces/order.interface";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail-client.component.html',
  styleUrl: './order-detail-client.component.css',
  imports: [
    DecimalPipe, RouterLink, CommonModule
  ],
})
export class OrderDetailClientComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);

  readonly orderResource = rxResource({
    stream: () => {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      return this.orderService.getOrderById(id);
    },
  });

  getStatusClass(status: string): string {
    const normalized = status?.toLowerCase() || '';
    if (normalized.includes('entregada') || normalized.includes('aprobada')) return 'success';
    if (normalized.includes('tránsito') || normalized.includes('pendiente') || normalized.includes('revisión')) return 'warning';
    return 'primary';
  }

  solicitarDevolucion(order: number): void {
    this.router.navigate(['/my-orders/create-return', order]);
  }
}
