import { Action } from '@ngrx/store';



export enum UserProfileActionTypes {
  PURCHASE_LICENSE = '[Create] Purchase license',
  PURCHASE_LICENSE_SUCCESS = '[Create] Purchase license success',
  PURCHASE_LICENSE_FAILURE = '[Create] Purchase license failure',
  CREATE_MEMORIAL = '[Create] Create memorial',
  CREATE_MEMORIAL_SUCCESS = '[Create] Create memorial success',
  CREATE_MEMORIAL_FAILURE = '[Create] Create memorial failure'
}

export class PurchaseLicense implements Action {
  readonly type = UserProfileActionTypes.PURCHASE_LICENSE;
  constructor (public payload: any) {}
}
export class PurchaseLicenseSuccess implements Action {
  readonly type = UserProfileActionTypes.PURCHASE_LICENSE_SUCCESS;
  constructor (public payload: any) {}
}
export class PurchaseLicenseFailure implements Action {
  readonly type = UserProfileActionTypes.PURCHASE_LICENSE_FAILURE;
  constructor (public payload: any) {}
}

export class CreateMemorial implements Action {
  readonly type = UserProfileActionTypes.CREATE_MEMORIAL;
  constructor (public payload: any) {}
}
export class CreateMemorialSuccess implements Action {
  readonly type = UserProfileActionTypes.CREATE_MEMORIAL_SUCCESS;
  constructor (public payload: any) {}
}
export class CreateMemorialFailure implements Action {
  readonly type = UserProfileActionTypes.CREATE_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | PurchaseLicense
  | PurchaseLicenseSuccess
  | PurchaseLicenseFailure
  | CreateMemorial
  | CreateMemorialSuccess
  | CreateMemorialFailure;
