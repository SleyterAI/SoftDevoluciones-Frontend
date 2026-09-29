import { Component, signal, inject, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitialsPipe } from '../../core/pipes/initials.pipe';
import { SidebarMenuService } from '../services/sibear-menu.service';
import { AuthCookieService } from '../../features/admin/users/services/auth-cookie.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [InitialsPipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  private router = inject(Router);
  private readonly authCookieService = inject(AuthCookieService);
  private readonly sidebarState = inject(SidebarMenuService);

  toggleMenu() {
    this.sidebarState.toggleMobileMenu();
  }

  email = this.authCookieService.getEmail();

  isUserMenuOpen = signal<boolean>(false);
  breadcrumbs = signal<string[]>(['SoftDevoluciones', 'Inicio']);

  // Diccionario actualizado a las rutas corporativas de SoftDevoluciones
  private routeNames: Record<string, string> = {
    '/inicio': 'Inicio',
    '/mis-compras': 'Mis compras',
    '/mis-devoluciones': 'Mis devoluciones',
    '/mi-perfil': 'Mi perfil',
    '/gestion-devoluciones': 'Gestión de devoluciones'
  };

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects.split('?')[0];
      const pageName = this.routeNames[currentUrl] || 'Inicio';
      this.breadcrumbs.set(['SoftDevoluciones', pageName]);
    });
  }

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
    if (!target.closest('.avatar-container')) {
      this.closeMenu();
    }
  }
}
