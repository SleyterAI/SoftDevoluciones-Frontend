import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { rxResource } from "@angular/core/rxjs-interop";
import { CommonModule, DecimalPipe } from "@angular/common";
import { ReturnClientService } from "../../services/return-client.service";


@Component({
  selector: 'app-return-detail',
  templateUrl: './my-return-detail.component.html',
  styleUrl: './my-return-detail.component.css',
  imports: [DecimalPipe, CommonModule, RouterLink],
})
export class MyReturnDetailComponent {
  private route = inject(ActivatedRoute);
  private returnService = inject(ReturnClientService);

  readonly returnResource = rxResource({
    stream: () => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      return this.returnService.getClientReturnById(id);
    },
  });

  getStatusClass(estado: string): string {
    switch (estado) {
      case 'SOLICITADO': return 'badge success';
      case 'EN_REVISION': return 'badge warning';
      case 'APROBADO': return 'badge danger';
      case 'COMPLETADO': return 'badge danger';
      case 'RECHAZADO': return 'badge danger';
      default: return 'badge primary';
    }
  }
}
