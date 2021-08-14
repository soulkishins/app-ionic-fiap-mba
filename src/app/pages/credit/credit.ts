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
            this.loadPaymentCalendar();
          }
        }
      );
      this.loadContracts();
  }

  viewContract(contract: Contract) {
    this.router.navigateByUrl("/contract", { state: contract });
  }

  prepayment() {
    this.creditData.prepaymentReceivable(
      this.calendar
    ).subscribe(
      () => {
        this.loadPaymentCalendar();
        this.loadContracts()
      }
    );
  }

  loadPaymentCalendar() {
    this.creditData
      .findReceivables(this.optIns.map(optin => optin.id))
      .subscribe(calendar => this.calendar = calendar);
  }

  loadContracts() {
    this.creditData
      .findContracts()
      .subscribe(contracts => this.contracts = contracts && contracts[0] ? contracts : null);
  }
}
