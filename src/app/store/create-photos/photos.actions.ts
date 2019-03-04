import { Action } from '@ngrx/store';

export enum CreatePhotosActionTypes {
  GET_CREATE_PHOTOS = '[Create Photos] Get create photos',
  GET_CREATE_PHOTOS_SUCCESS = '[Create Photos] Get create photos success',
  GET_CREATE_PHOTOS_FAILURE = '[Create Photos] Get create photos failure',
  UPLOAD_CREATE_PHOTO = '[Create Photos] Upload create photo',
  UPLOAD_CREATE_PHOTO_SUCCESS = '[Create Photos] Upload create photo success',
  UPLODA_CREATE_PHOTO_FAILURE = '[Create Photos] Upload create photo failure'
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

export class UploadCreatePhoto implements Action {
  readonly type = CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO;
  constructor (public payload: any) {}
}
export class UploadCreatePhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO_SUCCESS;
  constructor (public payload: any) {}
}
export class UploadCreatePhotoFailure implements Action {
  readonly type = CreatePhotosActionTypes.UPLODA_CREATE_PHOTO_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetCreatePhotos
  | GetCreatePhotosSuccess
  | GetCreatePhotosFailure
  | UploadCreatePhoto
  | UploadCreatePhotoSuccess
  | UploadCreatePhotoFailure;
