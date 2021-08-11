import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '../../interfaces/credit-dtos';

@Component({
  selector: 'page-contract',
  templateUrl: 'contract.html',
  styleUrls: ['./contract.scss'],
})
export class ContractPage {
  contract: Contract;

  constructor(
    public router: Router
  ) {
    this.contract = this.router.getCurrentNavigation().extras.state as Contract;
  }

  translateState(state: 'PENDING' | 'DUE' | 'PAID') {
    if (state === 'PENDING') return 'Pendente';
    if (state === 'DUE') return 'Vencido';
    return 'Liquidado';
  }

}
