import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/admin/users/pages/login-page/login-page.component';
import { MyReturnsComponent } from './features/my-returns/my-returns.component';
import { MyOrdersComponent } from './features/my-orders/my-orders.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FullPageComponent } from './layout/full-page/full-page.component';
import { StartComponent } from './features/start/start.component';
import { MyPerfilComponent } from './features/my-perfil/my-perfil.component';
import { OrdersComponent } from './features/admin/orders/orders.component';
import { ReturnsComponent } from './features/admin/returns/returns.component';
import { UsersComponent } from './features/admin/users/users.component';

export const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },*/
  {
    path: '',
    component: FullPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full'
      },
      {
        path: 'start',
        component: StartComponent,

      },
      /*{
        path: 'ticket/:id',
        component: TicketDetailPageComponent,

      },*/
      /*{
        path: 'ticket-form',
        component: TicketFormComponent,
      },*/
      {
        path: 'my-orders',
        component: MyOrdersComponent,

      },
      {
        path: 'my-returns',
        component: MyReturnsComponent,
      },
      {
        path: 'my-perfil',
        component: MyPerfilComponent,
      },
      {
        path: 'admin-orders',
        component: OrdersComponent,
      },
      {
        path: 'admin-returns',
        component: ReturnsComponent,
      },
      {
        path: 'admin-users',
        component: UsersComponent,
      },
    ]
  },
];
