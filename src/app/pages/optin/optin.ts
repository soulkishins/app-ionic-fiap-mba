import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OptIn, REQUEST_RESULT } from '../../interfaces/credit-dtos';
import { CreditData } from '../../providers/credit-data';

@Component({
  selector: 'page-optin',
  templateUrl: 'optin.html',
  styleUrls: ['./optin.scss'],
})
export class OptinPage {
  optIn: OptIn = new OptIn();
  error = false;
  errorMsg = "";

  constructor(
    public navCtrl: NavController,
    public creditData: CreditData
  ) {
    this.optIn.banners = [''];
    this.optIn.acquirers = [''];
  }

  doOptIn() {

    this.creditData
    .checkOptIn(this.optIn)
    .subscribe(
      state => {
        if (state !== REQUEST_RESULT.NOT_FOUND) {
          this.error = true;
          this.errorMsg = state === REQUEST_RESULT.ERROR ? 'Não foi possível validar o Opt-in.' : 'Opt-in já habilitado.';
          return;
        }
        this.creditData
        .doOptIn(this.optIn)
        .subscribe(
          state2 => {
            if (state2 !== REQUEST_RESULT.SUCCESS) {
              this.error = true;
              this.errorMsg = 'Não foi possível solicitar o acesso.';
              return;
            }
            this.navCtrl.back();
          }
        );
      }
    );
  }
}
