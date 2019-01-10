import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { CreateMemorialService } from './../../create-memorial/services/create-memorial.service';
import {
  AppActionTypes,
  CheckDiscount,
  CheckDiscountFailure,
  CheckDiscountSuccess,
  PurchaseLicense,
  PurchaseLicenseFailure,
  PurchaseLicenseSuccess,
} from './app.actions';
import { getDiscountCode } from './app.reducer';

@Injectable()
export class AppEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService,
    private store: Store<any>,
    private router: Router
  ) {}

  @Effect()
  checkDiscount$: Observable<Action> = this.actions.pipe(
    ofType(AppActionTypes.CHECK_DISCOUNT),
    switchMap((action: CheckDiscount) => this.api.checkDiscount(action.payload).pipe(
      map(code => new CheckDiscountSuccess(code)),
      catchError(error => of(new CheckDiscountFailure(error)))
    ))
  );

  @Effect()
  purchaseLicense$: Observable<Action> = this.actions.pipe(
    ofType(AppActionTypes.PURCHASE_LICENSE),
    withLatestFrom(this.store.pipe(select(getDiscountCode))),
    switchMap(([action, discount]: [PurchaseLicense, string | null]) => {
      return this.api.addLicense(action.payload.token, action.payload.quantity, action.payload.price, discount || null).pipe(
        map(res => new PurchaseLicenseSuccess(res)),
        catchError(error => of(new PurchaseLicenseFailure(error)))
      );
    })
  );

  @Effect({dispatch: false})
  purchaseLicenseSuccess$ = this.actions.pipe(
    ofType(AppActionTypes.PURCHASE_LICENSE_SUCCESS),
    map((action: PurchaseLicenseSuccess) => {
      this.router.navigateByUrl(`/create/${action.payload.memorials[0].uuid}`);
    })
  );
}
