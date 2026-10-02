import { Component, inject, signal } from '@angular/core';
import { ReturnAdminService } from '../../services/return-admin.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ReturnEstadoRequest } from '../../interfaces/return.interface';
import { ToastComponent } from '../../../../components/toast/toast.component';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago.pipe';
import { DatePipe, NgClass } from '@angular/common';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-check-detail',
  imports: [ToastComponent, TimeAgoPipe, DatePipe, NgClass, DecimalPipe],
  templateUrl: './check-detail.component.html',
  styleUrl: './check-detail.component.css',
})
export class CheckDetailComponent {
  private readonly returnService = inject(ReturnAdminService);
  private route = inject(ActivatedRoute);

  showToastEstado = signal(false);
  return_id: number = Number(this.route.snapshot.paramMap.get('id'));
  readonly returnResource = rxResource({
    stream: () => {

      return this.returnService.getAdminReturnById(this.return_id);
    },
  });

  cambiarEstado(nuevoEstado: string) {

    this.returnService.updateReturnStatus(Number(this.return_id), nuevoEstado).subscribe({
      next: () => {
        //Magic ng21 reload
        this.returnResource.reload();

        this.showToastEstado.set(true);
        setTimeout(() => {
          this.showToastEstado.set(false);
        }, 1500);

      },
      error: (err) => {
        console.error('Error estado:', err);
      }
    });
  }


  getInitials(name?: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }

  // Determina el estado visual de cada paso según tu regla exacta
  getStepStatus(stepName: string, currentEstado?: string): 'completed' | 'active' | 'pending' {
    const states = ['SOLICITADO', 'EN_REVISION', 'APROBADO', 'COMPLETADO', 'RECHAZADO'];
    const currentIndex = states.indexOf(currentEstado || 'ABIERTO');
    const stepIndex = states.indexOf(stepName);

    // Si el ticket está RECHAZADO, absolutamente todos los pasos terminan en verde
    if (currentEstado === 'RECHAZADO') {
      return 'completed';
    }

    // Los pasos pasados y el actual se quedan en verde (completed)
    if (stepIndex <= currentIndex) {
      return 'completed';
    }

    // El siguiente paso inmediato se pone en azul (active)
    if (stepIndex === currentIndex + 1) {
      return 'active';
    }

    // Los demás se quedan pendientes (gris)
    return 'pending';
  }

  // Determina si la línea conectora debe pintarse de verde
  isStepPassed(stepName: string, currentEstado?: string): boolean {
    const states = ['SOLICITADO', 'EN_REVISION', 'APROBADO', 'COMPLETADO', 'RECHAZADO'];
    const currentIndex = states.indexOf(currentEstado || 'SOLICITADO');
    const stepIndex = states.indexOf(stepName);

    // Si el ticket está cerrado, todas las líneas son verdes
    if (currentEstado === 'RECHAZADO') {
      return true;
    }

    return stepIndex < currentIndex;
  }
}
