import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccessRequest, Contract, OptIn, OptInFilter, PaymentCalendar, PreContract, REQUEST_RESULT } from '../interfaces/credit-dtos';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class CreditData {

  private OPTIONS: {
    observe: 'response';
    responseType: 'json';
  } = {
      observe: 'response',
      responseType: 'json'
    };

  constructor(public http: HttpClient, public user: UserData) { }

  processResult(response: HttpResponse<Object> | HttpErrorResponse): REQUEST_RESULT {

    if (response.status === 200) {
      return REQUEST_RESULT.SUCCESS;
    }

    if (response.status === 206) {
      return REQUEST_RESULT.PARTIAL;
    }

    if (response.status === 404) {
      return REQUEST_RESULT.NOT_FOUND;
    }

    return REQUEST_RESULT.ERROR;
  }

  processData<T>(response: HttpResponse<Object>): T {

    if (response.status === 200) {
      return response.body as T;
    }

    return null;
  }

  checkOptIn(filter: OptInFilter): Observable<REQUEST_RESULT> {
    return from(this.user.getUserID())
      .pipe(concatMap(userID => {
        return this.http
          .get(`${environment.backendURL}/credit/opt-in/check`, {
            ...this.OPTIONS,
            params: {
              participant: userID + '',
              ...filter
            }
          })
          .pipe(
            catchError(r => of(r)),
            map(this.processResult, this)
          );
      }));
  }

  listOptIn(): Observable<AccessRequest[]> {
    return from(this.user.getUserID())
      .pipe(concatMap(userID => {
        return this.http
          .get(`${environment.backendURL}/credit/opt-in/by-participant/${userID}`, this.OPTIONS)
          .pipe(
            catchError(r => of(r)),
            map<any, AccessRequest[]>(this.processData, this)
          );
      }));
  }

  doOptIn(optin: OptIn): Observable<REQUEST_RESULT> {
    return from(this.user.getUserID())
      .pipe(concatMap(userID => {
        optin.participant = userID;
        return this.http
          .post(`${environment.backendURL}/credit/opt-in`, optin, this.OPTIONS)
          .pipe(
            catchError(r => of(r)),
            map(this.processResult, this)
          );
      }));
  }

  doOptOut(optout: number[]): Observable<REQUEST_RESULT> {
    return this.http
      .post(`${environment.backendURL}/credit/opt-out`, optout, this.OPTIONS)
      .pipe(
        catchError(r => of(r)),
        map(this.processResult, this)
      );
  }

  findReceivables(optin: number[]): Observable<PaymentCalendar> {
    const options = {
      ... this.OPTIONS,
      params: {
        optin: optin.map(v => v + '')
      }
    };
    return this.http
      .get<HttpResponse<PaymentCalendar>>(`${environment.backendURL}/credit/receivables`, options)
      .pipe(
        catchError(r => of(r)),
        map<any, PaymentCalendar>(this.processData, this)
      );
  }

  findContracts(): Observable<Contract[]> {
    return from(this.user.getUserID())
      .pipe(concatMap(userID => {
        return this.http
          .get<HttpResponse<Contract[]>>(`${environment.backendURL}/credit/contract/by-participant/${userID}`, this.OPTIONS)
          .pipe(
            catchError(r => of(r)),
            map<any, Contract[]>(this.processData, this)
          );
      }))
  }

  simulateContract(preContract: PreContract): Observable<PreContract> {
    return from(this.user.getUserID())
      .pipe(concatMap(userID => {
        return this.http
          .post<HttpResponse<PreContract>>(`${environment.backendURL}/credit/contract/by-participant/${userID}/simulate`, preContract, this.OPTIONS)
          .pipe(
            catchError(r => of(r)),
            map<any, PreContract>(this.processData, this)
          );
      }))
  }

  prepaymentReceivable(preContract: PaymentCalendar): Observable<Contract> {
    return from(this.user.getUserID())
      .pipe(concatMap(userID => {
        return this.http
          .post<HttpResponse<Contract>>(`${environment.backendURL}/credit/contract/by-participant/${userID}/prepayment`, preContract, this.OPTIONS)
          .pipe(
            catchError(r => of(r)),
            map<any, Contract>(this.processData, this)
          );
      }))
  }
}
