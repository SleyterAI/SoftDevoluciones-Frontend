import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/admin/users/pages/login-page/login-page.component';
import { MyReturnsComponent } from './features/my-returns/my-returns.component';
import { MyOrdersComponent } from './features/my-orders/my-orders.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
  },
  {
    path: 'my-returns',
    component: MyReturnsComponent
  },
  {
    path: 'sidebar',
    component: SidebarComponent
  }
];
