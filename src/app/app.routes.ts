import { Routes } from '@angular/router';

import { LoginPageComponent } from './features/user/pages/login-page/login-page.component';
import { FullPageComponent } from './layout/full-page/full-page.component';
import { StartComponent } from './features/start/start.component';
import { MyOrdersComponent } from './features/order/pages/my-orders/my-orders.component';
import { OrderDetailClientComponent } from './features/order/components/order-detail-client/order-detail-client.component';
import { MyReturnsComponent } from './features/return/pages/my-returns/my-returns.component';
import { MyReturnDetailComponent } from './features/return/components/my-return-detail/my-return-detail.component';
import { MyPerfilComponent } from './features/user/components/my-perfil/my-perfil.component';
import { ReturnsComponent } from './features/return/pages/returns/returns.component';
import { OrdersComponent } from './features/order/pages/orders/orders.component';
import { OrderDetailAdminComponent } from './features/order/components/order-detail-admin/order-detail-admin.component';
import { UsersComponent } from './features/user/components/users/users.component';
import { CreateReturnComponent } from './features/return/components/create-return/create-return.component';
import { CheckDetailComponent } from './features/return/components/check-detail/check-detail.component';
import { ViewDetailComponent } from './features/return/components/view-detail/view-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: '', component: FullPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '',redirectTo: 'start',pathMatch: 'full' },
      { path: 'start', component: StartComponent },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'my-orders/:id', component: OrderDetailClientComponent },
      { path: 'my-returns', component: MyReturnsComponent },
      { path: 'my-returns/:id', component: MyReturnDetailComponent },
      { path: 'my-orders/create-return/:orderId/:productId', component: CreateReturnComponent },
      { path: 'my-perfil',component: MyPerfilComponent },
    ]
  },
  {
    path: 'admin', component: FullPageComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'returns', pathMatch: 'full' },
      { path: 'returns', component: ReturnsComponent },
      { path: 'returns/check-detail/:id', component: CheckDetailComponent },
      { path: 'returns/view-detail/:id', component: ViewDetailComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderDetailAdminComponent },
      { path: 'users', component: UsersComponent },
    ]
  }
];
