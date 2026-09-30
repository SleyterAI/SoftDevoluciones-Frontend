import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { InitialsPipe } from '../../../../core/pipes/initials.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule, InitialsPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  private readonly userService = inject(UserService);

  readonly userResource = rxResource({
    stream: () => this.userService.getAllUser()
  });

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Administrador': return 'badge-danger';
      case 'Operador': return 'badge-primary';
      default: return 'badge-success';
    }
  }

  editUser(userId: number): void {
    console.log(`Editar usuario con ID: ${userId}`);
  }

  deleteUser(userId: number): void {
    console.log(`Eliminar usuario con ID: ${userId}`);
  }
}
