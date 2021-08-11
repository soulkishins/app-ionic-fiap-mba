import { Component, OnInit } from '@angular/core';
import { CreditData } from '../../providers/credit-data';
import { AccessRequest, Contract, PaymentCalendar } from '../../interfaces/credit-dtos';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
  styleUrls: ['./credit.scss'],
})
export class CreditPage {
  optIns: AccessRequest[];
  calendar: PaymentCalendar;
  contracts: Contract[];

  constructor(
    public creditData: CreditData,
    public router: Router,
    public navCtrl: NavController
  ) { }

  ionViewWillEnter() {
    this.creditData
      .listOptIn()
      .subscribe(
        optIns => {
          this.optIns = optIns && optIns[0] ? optIns : null;
          if (optIns) {
            this.creditData
              .findReceivables(optIns.map(optin => optin.id))
              .subscribe(calendar => this.calendar = calendar);
          }
        }
      );
    this.creditData
      .findContracts()
      .subscribe(contracts => this.contracts = contracts && contracts[0] ? contracts : null);
  }

  viewContract(contract: Contract) {
    this.router.navigateByUrl("/contract", { state: contract });
  }
}
