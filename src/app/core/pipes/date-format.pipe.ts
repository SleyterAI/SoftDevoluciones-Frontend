import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true // Si estás usando componentes standalone modernos
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    // Convertimos a objeto Date (soporta tanto strings ISO como objetos Date)
    const date = new Date(value);

    // Validamos si es una fecha válida
    if (isNaN(date.getTime())) return String(value);

    // Extraemos día, mes y año asegurando que tengan 2 dígitos el día y mes
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
