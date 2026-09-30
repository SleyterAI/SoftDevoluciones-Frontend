import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InitialsPipe } from '../../core/pipes/initials.pipe';
import { SidebarMenuService } from '../services/sibear-menu.service';
import { AuthCookieService } from '../../features/user/services/auth-cookie.service';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, InitialsPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly authCookieService = inject(AuthCookieService);
  private readonly sidebarState = inject(SidebarMenuService);
  private router = inject(Router);

  isUserMenuOpen = signal<boolean>(false);
  isMobileMenuOpen = this.sidebarState.isMobileMenuOpen;

  user = signal({
    name: this.authCookieService.getEmail(),
    role: this.authCookieService.userRole() || 'Cliente',
    avatarInitials: this.authCookieService.getEmail(),
  });

  // Menú adaptado al dominio de SoftDevoluciones (Cliente / Operador)
  private readonly clientMenu: MenuItem[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home', route: '/start' },
    { id: 'compras', label: 'Mis compras', icon: 'shopping_bag', route: '/my-orders' },
    { id: 'devoluciones', label: 'Mis devoluciones', icon: 'assignment_return', route: '/my-returns' },
    { id: 'perfil', label: 'Mi perfil', icon: 'person', route: '/my-perfil' }
  ];

  private readonly operatorMenu: MenuItem[] = [
    { id: 'devoluciones-admin', label: 'Devoluciones', icon: 'sync_alt', route: '/admin/returns' },
    { id: 'compras-admin', label: 'Compras', icon: 'receipt_long', route: '/admin/orders' },
    { id: 'gestion', label: 'Usuarios', icon: 'persons', route: '/admin/users' }
  ];

  gestionMenu = computed(() => {
    const isAdmin = this.authCookieService.isAdmin();
    return isAdmin ? this.operatorMenu : this.clientMenu;
  });

  toggleUserMenu() {
    this.isUserMenuOpen.update(open => !open);
  }

  logout() {
    this.authCookieService.logout();
    this.router.navigate(['/login']);
  }

  closeMenu(): void {
    this.isUserMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-profile')) {
      this.closeMenu();
    }
  }

  closeMobileMenu() {
    this.sidebarState.closeMobileMenu();
  }
}
