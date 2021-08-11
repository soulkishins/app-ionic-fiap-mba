import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OptinPage } from './optin';

const routes: Routes = [
  {
    path: '',
    component: OptinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptinPageRoutingModule { }
