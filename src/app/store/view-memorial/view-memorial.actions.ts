import { Action } from '@ngrx/store';

export enum ViewMemorialActionTypes {
  GET_MEMORIAL = '[View Memorial] Get memorial',
  GET_MEMORIAL_SUCCESS = '[View Memorial] Get memorial success',
  GET_MEMORIAL_FAILURE = '[View Memorial] Get memorial failure'
}

export class GetMemorial implements Action {
  readonly type = ViewMemorialActionTypes.GET_MEMORIAL;
  constructor (public payload: string) {}
}
export class GetMemorialSuccess implements Action {
  readonly type = ViewMemorialActionTypes.GET_MEMORIAL_SUCCESS;
  constructor (public payload: any) {}
}
export class GetMemorialFailure implements Action {
  readonly type = ViewMemorialActionTypes.GET_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetMemorial
  | GetMemorialSuccess
  | GetMemorialFailure;
