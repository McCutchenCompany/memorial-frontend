import { Action } from '@ngrx/store';

export enum AppActionTypes {
  CHECK_DISCOUNT = '[App] Check discount',
  CHECK_DISCOUNT_SUCCESS = '[App] Check discount success',
  CHECK_DISCOUNT_FAILURE = '[App] Check discount failure',
  CLEAR_DISCOUNT = '[App] Clear discount',
  PURCHASE_LICENSE = '[Create] Purchase license',
  PURCHASE_LICENSE_SUCCESS = '[Create] Purchase license success',
  PURCHASE_LICENSE_FAILURE = '[Create] Purchase license failure',
}

export class CheckDiscount implements Action {
  readonly type = AppActionTypes.CHECK_DISCOUNT;
  constructor (public payload: string) {}
}
export class CheckDiscountSuccess implements Action {
  readonly type = AppActionTypes.CHECK_DISCOUNT_SUCCESS;
  constructor (public payload: any) {}
}
export class CheckDiscountFailure implements Action {
  readonly type = AppActionTypes.CHECK_DISCOUNT_FAILURE;
  constructor (public payload: any) {}
}

export class ClearDiscount implements Action {
  readonly type = AppActionTypes.CLEAR_DISCOUNT;
}

export class PurchaseLicense implements Action {
  readonly type = AppActionTypes.PURCHASE_LICENSE;
  constructor (public payload: any) {}
}
export class PurchaseLicenseSuccess implements Action {
  readonly type = AppActionTypes.PURCHASE_LICENSE_SUCCESS;
  constructor (public payload: any) {}
}
export class PurchaseLicenseFailure implements Action {
  readonly type = AppActionTypes.PURCHASE_LICENSE_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | CheckDiscount
  | CheckDiscountSuccess
  | CheckDiscountFailure
  | ClearDiscount
  | PurchaseLicense
  | PurchaseLicenseSuccess
  | PurchaseLicenseFailure;
