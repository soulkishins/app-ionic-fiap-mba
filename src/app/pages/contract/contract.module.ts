import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContractPage } from './contract';
import { ContractPageRoutingModule } from './contract-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractPageRoutingModule
  ],
  declarations: [ContractPage],
  bootstrap: [ContractPage],
})
export class ContractModule {}
