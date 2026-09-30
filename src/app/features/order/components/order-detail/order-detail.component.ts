import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { rxResource } from "@angular/core/rxjs-interop";
import { CommonModule, DecimalPipe } from "@angular/common";
import { OrderService } from "../../services/order.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
  imports: [
    DecimalPipe, RouterLink, CommonModule
  ],
})
export class OrderDetailComponent {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  readonly orderResource = rxResource({
    stream: () => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      return this.orderService.getOrderById(id);
    },
  });

  getStatusClass(status: string): string {
    const normalized = status?.toLowerCase() || '';
    if (normalized.includes('entregada') || normalized.includes('aprobada')) return 'success';
    if (normalized.includes('tránsito') || normalized.includes('pendiente') || normalized.includes('revisión')) return 'warning';
    return 'primary';
  }
}
