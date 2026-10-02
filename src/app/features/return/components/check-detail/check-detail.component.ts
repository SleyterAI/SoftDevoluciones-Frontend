import { Component, inject, signal } from '@angular/core';
import { ReturnAdminService } from '../../services/return-admin.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReturnEstadoRequest } from '../../interfaces/return.interface';
import { ToastComponent } from '../../../../components/toast/toast.component';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago.pipe';
import { DatePipe, NgClass } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-check-detail',
  imports: [RouterLink,ToastComponent, TimeAgoPipe, DatePipe, NgClass, DecimalPipe, FormsModule],
  templateUrl: './check-detail.component.html',
  styleUrl: './check-detail.component.css',
})
export class CheckDetailComponent {
  private readonly returnService = inject(ReturnAdminService);
  private route = inject(ActivatedRoute);

  operatorNotes: string = '';

  showToastEstado = signal(false);
  showToastNotas = signal(false);

  readonly return_id: number = Number(this.route.snapshot.paramMap.get('id'));

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

  updateOperatorNotes(notes: string){
    this.returnService.updateOperatorNotes(this.return_id, notes).subscribe({
      next: () => {
        //Magic ng21 reload
        this.returnResource.reload();
        this.operatorNotes = '';
        this.showToastNotas.set(true);
        setTimeout(() => {
          this.showToastNotas.set(false);
        }, 1500);

      },
      error: (err) => {
        console.error('Error estado:', err);
      }
    })
  }


  getInitials(name?: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }

  getStepStatus(stepName: string, currentEstado?: string): 'completed' | 'active' | 'pending' | 'noCompleted'{
    const states = ['SOLICITADO', 'EN_REVISION', 'APROBADO', 'COMPLETADO', 'RECHAZADO'];
    const currentIndex = states.indexOf(currentEstado || 'SOLICITADO');
    const stepIndex = states.indexOf(stepName);

    if (currentEstado === 'RECHAZADO' && stepName === 'COMPLETADO') {
      return 'noCompleted';
    }

    if (currentEstado === 'COMPLETADO') {
      return 'completed';
    }

    if (stepIndex <= currentIndex) {
      return 'completed';
    }

    if (stepIndex === currentIndex + 1) {
      return 'active';
    }

    return 'pending';
  }

  isStepPassed(stepName: string, currentEstado?: string): boolean {
    const states = ['SOLICITADO', 'EN_REVISION', 'APROBADO', 'COMPLETADO', 'RECHAZADO'];
    const currentIndex = states.indexOf(currentEstado || 'SOLICITADO');
    const stepIndex = states.indexOf(stepName);

    //lineas en verde
    if (currentEstado === 'RECHAZADO' || currentEstado === 'COMPLETADO') {
      return true;
    }
    return stepIndex < currentIndex;
  }
}
