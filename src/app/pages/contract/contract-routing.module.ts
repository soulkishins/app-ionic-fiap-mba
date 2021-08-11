import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractPage } from './contract';

const routes: Routes = [
  {
    path: '',
    component: ContractPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractPageRoutingModule { }
