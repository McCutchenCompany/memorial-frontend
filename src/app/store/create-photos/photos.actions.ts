import { Action } from '@ngrx/store';

export enum CreatePhotosActionTypes {
  GET_CREATE_PHOTOS = '[Create Photos] Get create photos',
  GET_CREATE_PHOTOS_SUCCESS = '[Create Photos] Get create photos success',
  GET_CREATE_PHOTOS_FAILURE = '[Create Photos] Get create photos failure'
}

export class GetCreatePhotos implements Action {
  readonly type = CreatePhotosActionTypes.GET_CREATE_PHOTOS;
  constructor (public payload: any) {}
}
export class GetCreatePhotosSuccess implements Action {
  readonly type = CreatePhotosActionTypes.GET_CREATE_PHOTOS_SUCCESS;
  constructor (public payload: any) {}
}
export class GetCreatePhotosFailure implements Action {
  readonly type = CreatePhotosActionTypes.GET_CREATE_PHOTOS_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetCreatePhotos
  | GetCreatePhotosSuccess
  | GetCreatePhotosFailure;
