import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./pages/credit/credit.module').then(m => m.CreditModule)
  },
  {
    path: 'contract',
    loadChildren: () => import('./pages/contract/contract.module').then(m => m.ContractModule)
  },
  {
    path: 'optin',
    loadChildren: () => import('./pages/optin/optin.module').then(m => m.OptinModule)
  },
  {
    path: 'prepayment',
    loadChildren: () => import('./pages/prepayment/prepayment.module').then(m => m.PrepaymentModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
