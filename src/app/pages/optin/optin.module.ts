import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OptinPage } from './optin';
import { OptinPageRoutingModule } from './optin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptinPageRoutingModule
  ],
  declarations: [OptinPage],
  bootstrap: [OptinPage],
})
export class OptinModule {}
