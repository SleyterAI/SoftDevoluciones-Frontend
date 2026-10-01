import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ReturnClientService } from '../../services/return-client.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReturnClientResponse } from '../../interfaces/return.interface';

@Component({
  selector: 'app-my-returns',
  imports: [CommonModule],
  templateUrl: './my-returns.component.html',
  styleUrl: './my-returns.component.css',
})
export class MyReturnsComponent {
  private readonly router = inject(Router);
  private readonly returnClientService = inject(ReturnClientService);

  readonly returnResource = rxResource({
    stream: () => this.returnClientService.getClientReturn()
  });

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'SOLICITADO': return 'badge success';
      case 'EN_REVISION': return 'badge warning';
      case 'APROBADO': return 'badge danger';
      case 'COMPLETADO': return 'badge danger';
      case 'RECHAZADO': return 'badge danger';
      default: return 'badge primary';
    }
  }

  onDetailsClick(returnClient: ReturnClientResponse) {
        this.router.navigate(['/my-returns', returnClient.return_id]);
    }
}
