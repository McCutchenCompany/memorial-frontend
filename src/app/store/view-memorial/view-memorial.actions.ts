import { Action } from '@ngrx/store';

export enum ViewMemorialActionTypes {
  GET_MEMORIAL = '[View Memorial] Get memorial',
  GET_MEMORIAL_SUCCESS = '[View Memorial] Get memorial success',
  GET_MEMORIAL_FAILURE = '[View Memorial] Get memorial failure',
  ADD_MEMORY = '[View Memorial] Add memory',
  ADD_MEMORY_SUCCESS = '[View Memorial] Add memory success',
  ADD_MEMORY_FAILURE = '[View Memorial] Add memory failure'
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

export class AddMemory implements Action {
  readonly type = ViewMemorialActionTypes.ADD_MEMORY;
  constructor (public payload: {memorial_id: string, body: {title: string, description: string}}) {}
}
export class AddMemorySuccess implements Action {
  readonly type = ViewMemorialActionTypes.ADD_MEMORY_SUCCESS;
  constructor (public payload: any) {}
}
export class AddMemoryFailure implements Action {
  readonly type = ViewMemorialActionTypes.ADD_MEMORY_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetMemorial
  | GetMemorialSuccess
  | GetMemorialFailure
  | AddMemory
  | AddMemorySuccess
  | AddMemoryFailure;
