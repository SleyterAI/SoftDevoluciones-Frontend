import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { rxResource } from "@angular/core/rxjs-interop";
import { CommonModule, DecimalPipe } from "@angular/common";
import { ReturnClientService } from "../../services/return-client.service";
import { ReturnAdminService } from "../../services/return-admin.service";


@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrl: './return-detail.component.css',
  imports: [DecimalPipe, CommonModule, RouterLink],
})
export class ReturnDetailComponent {
  private route = inject(ActivatedRoute);
  private returnService = inject(ReturnAdminService);

  readonly returnResource = rxResource({
    stream: () => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      return this.returnService.getAdminReturnById(id);
    },
  });

  getStatusClass(estado: string): string {
    switch (estado) {
      case 'SOLICITADO': return 'badge success';
      case 'EN_REVISION': return 'badge warning';
      case 'APROBADO': return 'badge warning';
      case 'COMPLETADO': return 'badge success';
      case 'RECHAZADO': return 'badge danger';
      default: return 'badge primary';
    }
  }
}
