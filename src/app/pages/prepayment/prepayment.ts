import { Component, OnInit } from '@angular/core';
import { CreditData } from '../../providers/credit-data';
import { AccessRequest, Contract, PaymentCalendar } from '../../interfaces/credit-dtos';

@Component({
  selector: 'page-prepayment',
  templateUrl: 'prepayment.html',
  styleUrls: ['./prepayment.scss'],
})
export class PrepaymentPage implements OnInit {
  optIns: AccessRequest[];
  calendar: PaymentCalendar;
  contracts: Contract[];

  constructor(public creditData: CreditData) { }

  ngOnInit() {
    this.creditData
      .listOptIn()
      .subscribe(
        optIns => {
          this.optIns = optIns;
          if (optIns) {
            this.creditData
              .findReceivables(optIns.map(optin => optin.id))
              .subscribe(calendar => this.calendar = calendar);
          }
        }
      );
    this.creditData
      .findContracts()
      .subscribe(contracts => this.contracts = contracts);
  }
}
