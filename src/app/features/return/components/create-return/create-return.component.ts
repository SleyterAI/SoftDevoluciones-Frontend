import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnClientService } from '../../services/return-client.service';
import { ReturnRequest } from '../../interfaces/return.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../order/services/order.service';

@Component({
  selector: 'app-solicitar-devolucion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-return.component.html',
  styleUrls: ['./create-return.component.css']
})
export class CreateReturnComponent {
  private fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private readonly returnClientService = inject(ReturnClientService);
  private readonly orderService = inject(OrderService);

  order_id = Number(
    this.route.snapshot.paramMap.get('orderId')
  );

  product_id = Number(
    this.route.snapshot.paramMap.get('productId')
  );

  readonly orderDetailResource = rxResource({
    stream: () => {
      return this.orderService.getOrderDetailByOrderIdAndProductId(this.order_id, this.product_id);
    },
  });

  // Formulario reactivo moderno
  devolucionForm = this.fb.group({
    quantity: [1, [Validators.required, Validators.min(1), Validators.max(2)]],
    reason: ['Producto defectuoso', [Validators.required]],
    comment: ['El clic derecho no funciona correctamente.', [Validators.required]]
  });

  motivosOpciones = [
    'Producto defectuoso',
    'No era lo que esperaba',
    'Llegó dañado / empaque roto',
    'Piezas o accesorios faltantes'
  ];


  createReturn(orderDetail_id: number) {
    if (this.devolucionForm.invalid) {
      this.devolucionForm.markAllAsTouched();
      return;
    }
    const formValues = this.devolucionForm.getRawValue();

    const request: ReturnRequest = {
      orderDetail_id: orderDetail_id,
      quantity: formValues.quantity,
      reason: formValues.reason,
      comment: formValues.comment
    };

    this.returnClientService.createReturn(request)
      .subscribe({
        next: () => {
          this.router.navigate(['/my-returns']);
          console.log("return creado")
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onCancelar(): void {
    this.router.navigate(['/my-orders']);
  }
}
