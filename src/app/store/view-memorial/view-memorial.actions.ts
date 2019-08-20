import { Action } from '@ngrx/store';

export enum ViewMemorialActionTypes {
  GET_MEMORIAL = '[View Memorial] Get memorial',
  GET_MEMORIAL_SUCCESS = '[View Memorial] Get memorial success',
  GET_MEMORIAL_FAILURE = '[View Memorial] Get memorial failure',
  ADD_MEMORY = '[View Memorial] Add memory',
  ADD_MEMORY_SUCCESS = '[View Memorial] Add memory success',
  ADD_MEMORY_FAILURE = '[View Memorial] Add memory failure',
  DELETE_MEMORY = '[View Memorial] Delete memory',
  DELETE_MEMORY_SUCCESS = '[View Memorial] Delete memory success',
  DELETE_MEMORY_FAILURE = '[View Memorial] Delete memory failure',
  EDIT_MEMORY = '[View Memorial] Edit memory',
  EDIT_MEMORY_SUCCESS = '[View Memorial] Edit memory success',
  EDIT_MEMORY_FAILURE = '[View Memorial] Edit memory failure',
  REMOVE_PHOTO_FROM_COUNT = '[View Memorial] Remove photo from count',
  ADD_PHOTO_TO_COUNT = '[View Memorial] Add photo to count',
  JOIN_MEMORIAL = '[View Memorial] Join memorial',
  JOIN_MEMORIAL_SUCCESS = '[View Memorial] Join memorial success',
  JOIN_MEMORIAL_FAILURE = '[View Memorial] Join memorial failure'
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

export class DeleteMemory implements Action {
  readonly type = ViewMemorialActionTypes.DELETE_MEMORY;
  constructor (public payload: string) {}
}
export class DeleteMemorySuccess implements Action {
  readonly type = ViewMemorialActionTypes.DELETE_MEMORY_SUCCESS;
  constructor (public payload: any) {}
}
export class DeleteMemoryFailure implements Action {
  readonly type = ViewMemorialActionTypes.DELETE_MEMORY_FAILURE;
  constructor (public payload: any) {}
}

export class EditMemory implements Action {
  readonly type = ViewMemorialActionTypes.EDIT_MEMORY;
  constructor (public payload: any) {}
}
export class EditMemorySuccess implements Action {
  readonly type = ViewMemorialActionTypes.EDIT_MEMORY_SUCCESS;
  constructor (public payload: any) {}
}
export class EditMemoryFailure implements Action {
  readonly type = ViewMemorialActionTypes.EDIT_MEMORY_FAILURE;
  constructor (public payload: any) {}
}

export class RemovePhotoFromCount implements Action {
  readonly type = ViewMemorialActionTypes.REMOVE_PHOTO_FROM_COUNT;
}
export class AddPhotoToCount implements Action {
  readonly type = ViewMemorialActionTypes.ADD_PHOTO_TO_COUNT;
}

export class JoinMemorial implements Action {
  readonly type = ViewMemorialActionTypes.JOIN_MEMORIAL;
  constructor (public payload: string) {}
}
export class JoinMemorialSuccess implements Action {
  readonly type = ViewMemorialActionTypes.JOIN_MEMORIAL_SUCCESS;
  constructor (public payload: any) {}
}
export class JoinMemorialFailure implements Action {
  readonly type = ViewMemorialActionTypes.JOIN_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetMemorial
  | GetMemorialSuccess
  | GetMemorialFailure
  | AddMemory
  | AddMemorySuccess
  | AddMemoryFailure
  | DeleteMemory
  | DeleteMemoryFailure
  | DeleteMemorySuccess
  | EditMemory
  | EditMemorySuccess
  | EditMemoryFailure
  | RemovePhotoFromCount
  | AddPhotoToCount
  | JoinMemorial
  | JoinMemorialSuccess
  | JoinMemorialFailure;
