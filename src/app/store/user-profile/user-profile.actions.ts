import { Action } from '@ngrx/store';



export enum UserProfileActionTypes {
  CREATE_MEMORIAL = '[Profile] Create memorial',
  CREATE_MEMORIAL_SUCCESS = '[Profile] Create memorial success',
  CREATE_MEMORIAL_FAILURE = '[Profile] Create memorial failure'
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
  | CreateMemorial
  | CreateMemorialSuccess
  | CreateMemorialFailure;
