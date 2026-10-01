import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-devolucion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-return.component.html',
  styleUrls: ['./create-return.component.css']
})
export class CreateReturnComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  // Datos de ejemplo del producto que se está devolviendo (según el PDF Interfaz 4)
  producto = signal({
    nombre: 'Mouse Logitech M330',
    precioUnitario: 80.00,
    comprados: 2,
    disponibles: 2,
    maxPermitido: 2,
    imagen: 'assets/mouse.jpg' // O url de ejemplo
  });

  // Formulario reactivo moderno
  devolucionForm = this.fb.group({
    cantidad: [1, [Validators.required, Validators.min(1), Validators.max(2)]],
    motivo: ['Producto defectuoso', [Validators.required]],
    descripcion: ['El clic derecho no funciona correctamente.', [Validators.required]]
  });

  motivosOpciones = [
    'Producto defectuoso',
    'No era lo que esperaba',
    'Llegó dañado / empaque roto',
    'Piezas o accesorios faltantes'
  ];

  onSubmit(): void {
    if (this.devolucionForm.invalid) {
      this.devolucionForm.markAllAsTouched();
      return;
    }

    const formData = this.devolucionForm.getRawValue();
    console.log('Enviando solicitud de devolución:', formData);

    // Simulación de envío exitoso y redirección
    // this.router.navigate(['/mis-devoluciones']);
  }

  onCancelar(): void {
    this.router.navigate(['/my-orders']);
  }

  //how this shit works
  /**
   * enviamos order_id y product_id de order_detail a create-return
   * ahi usamos ambos id para buscar en un metodo con 2 parametros <-
   * enviamos al backend y que responda con los del producto de la order exacta
   * de ahi cargamos esos datos en la interfaz
   * ----ver como crear el return<-------
   */

}
