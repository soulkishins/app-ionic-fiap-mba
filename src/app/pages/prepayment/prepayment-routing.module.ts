import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrepaymentPage } from './prepayment';

const routes: Routes = [
  {
    path: '',
    component: PrepaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepaymentPageRoutingModule { }
