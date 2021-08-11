import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreditPage } from './credit';
import { CreditPageRoutingModule } from './credit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditPageRoutingModule
  ],
  declarations: [CreditPage],
  bootstrap: [CreditPage],
})
export class CreditModule {}
