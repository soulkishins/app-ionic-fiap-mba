import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public storage: Storage
  ) { }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      if (username === 'demo1@example.com') {
        this.setIdentification('16002128000124');
        this.setUsername(username);
        this.setUserID(1);
      }
      if (username === 'demo2@example.com') {
        this.setIdentification('39315801000181');
        this.setUsername(username);
        this.setUserID(2);
      }
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('identification') &&
             this.storage.remove('username') &&
             this.storage.remove('userID');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setIdentification(identification: string): Promise<any> {
    return this.storage.set('identification', identification);
  }

  getIdentification(): Promise<string> {
    return this.storage.get('identification').then((value) => {
      return value;
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  setUserID(userID: number): Promise<any> {
    return this.storage.set('userID', userID);
  }

  getUserID(): Promise<number> {
    return this.storage.get('userID').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

}
