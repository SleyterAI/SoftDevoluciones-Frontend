import { Component, inject, signal } from '@angular/core';
import { ReturnAdminService } from '../../services/return-admin.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../../../../core/pipes/date-format.pipe';

interface FilterCriteria {
  status?: string;
  fromDate?: string;
  toDate?: string;
}

@Component({
  selector: 'app-returns',
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.css',
})
export class ReturnsComponent {
  private router = inject(Router);
  private readonly returnAdminService = inject(ReturnAdminService);

  selectedEstado = signal<string>('TODOS');
  fechaDesde = signal<string>('2026-08-01');
  fechaHasta = signal<string>('2026-09-30');
  searchTerm = signal<string>('');

  private appliedFilters = signal<FilterCriteria>({});

  readonly returnResource = rxResource({
    params: () => this.appliedFilters(),
    stream: ({ params }) => {

      if (!params.status && !params.fromDate && !params.toDate) {
        return this.returnAdminService.getReturnsWithFilters();
      }

      return this.returnAdminService.getReturnsWithFilters(
        params.status,
        params.fromDate,
        params.toDate
      );
    }
  });

  estadosList = [
    { value: 'TODOS', label: 'Todos' },
    { value: 'SOLICITADO', label: 'Solicitado' },
    { value: 'EN_REVISION', label: 'En revision' },
    { value: 'APROBADO', label: 'Aprobado' },
    { value: 'RECHAZADO', label: 'Rechazado' },
    { value: 'COMPLETADO', label: 'Completado' }
  ];

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'SOLICITADO': return 'badge blue';
      case 'EN_REVISION': return 'badge warning';
      case 'APROBADO': return 'badge green';
      case 'COMPLETADO': return 'badge purple';
      case 'RECHAZADO': return 'badge danger';
      default: return 'badge primary';
    }
  }

  onEstadoChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedEstado.set(value);
  }

  onFechaDesdeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.fechaDesde.set(value);
  }

  onFechaHastaChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.fechaHasta.set(value);
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  esRevisable(status: string): boolean {
    const st = status?.toLowerCase() || '';
    return st === 'solicitado' || st === 'en_revision'|| st === 'aprobado';
  }

  onSearch(): void {
    const estado = this.selectedEstado();
    const desde = this.fechaDesde();
    const hasta = this.fechaHasta();

    const formatDate = (dateStr: string) => {
      if (!dateStr) return undefined;
      const [year, month, day] = dateStr.split('-');
      return `${day}-${month}-${year}`;
    };

    this.appliedFilters.set({
      status: estado === 'TODOS' ? undefined : estado,
      fromDate: formatDate(desde),
      toDate: formatDate(hasta)
    });
  }

  onRevisarClick(return_id: number) {
    this.router.navigate(['/admin/returns/check-detail', return_id]);
  }

  onVerClick(return_id: number) {
    this.router.navigate(['/admin/returns/check-detail', return_id]);
  }
}
