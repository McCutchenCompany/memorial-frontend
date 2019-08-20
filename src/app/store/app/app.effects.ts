import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { CreateMemorialService } from './../../create-memorial/services/create-memorial.service';
import {
  AppActionTypes,
  CheckDiscount,
  CheckDiscountFailure,
  CheckDiscountSuccess,
  CreateFreeMemorial,
  CreateFreeMemorialFailure,
  CreateFreeMemorialSuccess,
  PurchaseLicense,
  PurchaseLicenseFailure,
  PurchaseLicenseSuccess,
  SendBugEmail,
  SendBugEmailFailure,
  SendBugEmailSuccess,
  SendSupportEmail,
  SendSupportEmailFailure,
  SendSupportEmailSuccess,
  UnlockMemorial,
  UnlockMemorialFailure,
  UnlockMemorialSuccess,
} from './app.actions';
import { getDiscountCode } from './app.reducer';

@Injectable()
export class AppEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService,
    private store: Store<any>,
    private router: Router,
    private dialog: MatDialog
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

  @Effect()
  unlockMemorial$: Observable<Action> = this.actions.pipe(
    ofType(AppActionTypes.UNLOCK_MEMORIAL),
    switchMap((action: UnlockMemorial) => {
      return this.api.unlockMemorial(action.payload.token, action.payload.memorial_id, action.payload.price).pipe(
        map((res: Memorial) => new UnlockMemorialSuccess(res)),
        catchError(error => of(new UnlockMemorialFailure(error)))
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

  @Effect()
  createFreeMemorial$: Observable<Action> = this.actions.pipe(
    ofType(AppActionTypes.CREATE_FREE_MEMORIAL),
    switchMap((action: CreateFreeMemorial) => this.api.createFreeMemorial().pipe(
      map((res: Memorial) => new CreateFreeMemorialSuccess(res)),
      catchError(error => of(new CreateFreeMemorialFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  createFreeMemorialSuccess$ = this.actions.pipe(
    ofType(AppActionTypes.CREATE_FREE_MEMORIAL_SUCCESS),
    map((action: CreateFreeMemorialSuccess) => {
      this.router.navigate(['/create', action.payload.uuid]);
    })
  );

  @Effect()
  sendSupportEmail$: Observable<Action> = this.actions.pipe(
    ofType(AppActionTypes.SEND_SUPPORT_EMAIL),
    switchMap((action: SendSupportEmail) => this.api.sendSupportEmail(action.payload).pipe(
      map(res => new SendSupportEmailSuccess(res)),
      catchError(error => of(new SendSupportEmailFailure(error)))
    ))
  );

  @Effect()
  SendBugEmail$: Observable<Action> = this.actions.pipe(
    ofType(AppActionTypes.SEND_BUG_EMAIL),
    switchMap((action: SendBugEmail) => this.api.sendBugEmail(action.payload).pipe(
      map(res => new SendBugEmailSuccess(res)),
      catchError(error => of(new SendBugEmailFailure(error)))
    ))
  );
}
