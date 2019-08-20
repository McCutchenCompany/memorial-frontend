import { Action } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';

export enum AppActionTypes {
  CHECK_DISCOUNT = '[App] Check discount',
  CHECK_DISCOUNT_SUCCESS = '[App] Check discount success',
  CHECK_DISCOUNT_FAILURE = '[App] Check discount failure',
  CLEAR_DISCOUNT = '[App] Clear discount',
  GET_STRIPE_KEY = '[App] Get stripe key',
  PURCHASE_LICENSE = '[Create] Purchase license',
  PURCHASE_LICENSE_SUCCESS = '[Create] Purchase license success',
  PURCHASE_LICENSE_FAILURE = '[Create] Purchase license failure',
  CREATE_FREE_MEMORIAL = '[Create] Create free memorial',
  CREATE_FREE_MEMORIAL_SUCCESS = '[Create] Create free memorial success',
  CREATE_FREE_MEMORIAL_FAILURE = '[Create] Create free memorial failure',
  SEND_SUPPORT_EMAIL = '[App] Send support email',
  SEND_SUPPORT_EMAIL_SUCCESS = '[App] Send support email success',
  SEND_SUPPORT_EMAIL_FAILURE = '[App] Send suport email failure',
  SEND_BUG_EMAIL = '[App] Send bug email',
  SEND_BUG_EMAIL_SUCCESS = '[App] Send bug email success',
  SEND_BUG_EMAIL_FAILURE = '[App] Send bug email failure',
  UNLOCK_MEMORIAL = '[App] Unlock memorial',
  UNLOCK_MEMORIAL_SUCCESS = '[App] Unlock memorial success',
  UNLOCK_MEMORIAL_FAILURE = '[App] Unlock memorial failure'
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

export class GetStripeKey implements Action {
  readonly type = AppActionTypes.GET_STRIPE_KEY;
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

export class CreateFreeMemorial implements Action {
  readonly type = AppActionTypes.CREATE_FREE_MEMORIAL;
}
export class CreateFreeMemorialSuccess implements Action {
  readonly type = AppActionTypes.CREATE_FREE_MEMORIAL_SUCCESS;
  constructor (public payload: Memorial) {}
}
export class CreateFreeMemorialFailure implements Action {
  readonly type = AppActionTypes.CREATE_FREE_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export class SendSupportEmail implements Action {
  readonly type = AppActionTypes.SEND_SUPPORT_EMAIL;
  constructor (public payload: {email: string, subject: string, content: string}) {}
}
export class SendSupportEmailSuccess implements Action {
  readonly type = AppActionTypes.SEND_SUPPORT_EMAIL_SUCCESS;
  constructor (public payload: any) {}
}
export class SendSupportEmailFailure implements Action {
  readonly type = AppActionTypes.SEND_SUPPORT_EMAIL_FAILURE;
  constructor (public payload: any) {}
}

export class SendBugEmail implements Action {
  readonly type = AppActionTypes.SEND_BUG_EMAIL;
  constructor (public payload: {email: string, subject: string, content: string}) {}
}
export class SendBugEmailSuccess implements Action {
  readonly type = AppActionTypes.SEND_BUG_EMAIL_SUCCESS;
  constructor (public payload: any) {}
}
export class SendBugEmailFailure implements Action {
  readonly type = AppActionTypes.SEND_BUG_EMAIL_FAILURE;
  constructor (public payload: any) {}
}

export class UnlockMemorial implements Action {
  readonly type = AppActionTypes.UNLOCK_MEMORIAL;
  constructor (public payload: any) {}
}
export class UnlockMemorialSuccess implements Action {
  readonly type = AppActionTypes.UNLOCK_MEMORIAL_SUCCESS;
  constructor (public payload: Memorial) {}
}
export class UnlockMemorialFailure implements Action {
  readonly type = AppActionTypes.UNLOCK_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | CheckDiscount
  | CheckDiscountSuccess
  | CheckDiscountFailure
  | ClearDiscount
  | GetStripeKey
  | PurchaseLicense
  | PurchaseLicenseSuccess
  | PurchaseLicenseFailure
  | SendSupportEmail
  | SendSupportEmailSuccess
  | SendSupportEmailFailure
  | SendBugEmail
  | SendBugEmailSuccess
  | SendBugEmailFailure
  | UnlockMemorial
  | UnlockMemorialSuccess
  | UnlockMemorialFailure;
