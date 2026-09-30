import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/user/pages/login-page/login-page.component';
import { MyReturnsComponent } from './features/return/my-returns/my-returns.component';
import { MyOrdersComponent } from './features/order/components/my-orders/my-orders.component';
import { FullPageComponent } from './layout/full-page/full-page.component';
import { StartComponent } from './features/start/start.component';
import { MyPerfilComponent } from './features/user/components/my-perfil/my-perfil.component';
import { OrdersComponent } from './features/order/components/orders/orders.component';
import { ReturnsComponent } from './features/return/returns/returns.component';
import { UsersComponent } from './features/user/components/users/users.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: '', component: FullPageComponent,
    children: [
      { path: '',redirectTo: 'start',pathMatch: 'full' },
      { path: 'start', component: StartComponent },
      /*{ path: 'ticket/:id',component: TicketDetailPageComponent,},*/
      /*{ path: 'ticket-form',component: TicketFormComponent,},*/
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'my-returns',component: MyReturnsComponent },
      { path: 'my-perfil',component: MyPerfilComponent },
    ]
  },
  {
    path: 'admin', component: FullPageComponent,
    children: [
      { path: '', redirectTo: 'returns', pathMatch: 'full' },
      { path: 'returns', component: ReturnsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'users', component: UsersComponent },
    ]
  }
];
