import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage {

  constructor(
    public userData: UserData,
    public router: Router
  ) {}

  gotoCredit() {
    this.router.navigateByUrl('/credit');
  }
}
