import { Action } from '@ngrx/store';
import { Photo } from '@shared/models/photo.model';

export enum AlbumActionType {
  GET_ALBUM_PHOTOS = '[Album] Get album photos',
  GET_ALBUM_PHOTOS_SUCCESS = '[Album] Get album photos success',
  GET_ALBUM_PHOTOS_FAILURE = '[Album] Get album photos failure',
  GET_MORE_ALBUM_PHOTOS = '[Album] Get more album photos',
  GET_MORE_ALBUM_PHOTOS_SUCCESS = '[Album] Get more album photos success',
  GET_MORE_ALBUM_PHOTOS_FAILURE = '[Album] Get more album photos failure',
  UPDATE_ALBUM_PHOTO = '[Album] Update album photo',
  UPDATE_ALBUM_PHOTO_SUCCESS = '[Album] Update album photo success',
  UPDATE_ALBUM_PHOTO_FAILURE = '[Album] Update album photo failure',
  UPLOAD_ALBUM_PHOTO = '[Album] Upload album photo',
  UPLOAD_ALBUM_PHOTO_SUCCESS = '[Album] Upload album photo success',
  UPLOAD_ALBUM_PHOTO_FAILURE = '[Album] Upload album photo failure',
  DELETE_PHOTO = '[Album] Delete photo',
  DELETE_PHOTO_SUCCESS = '[Album] Delete photo success',
  DELETE_PHOTO_FAILURE = '[Album] Delete photo failure'
}

export class GetAlbumPhotos implements Action {
  readonly type = AlbumActionType.GET_ALBUM_PHOTOS;
  constructor (public payload: {memorial_id: string}) {}
}
export class GetAlbumPhotosSuccess implements Action {
  readonly type = AlbumActionType.GET_ALBUM_PHOTOS_SUCCESS;
  constructor (public payload: Photo[]) {}
}
export class GetAlbumPhotosFailure implements Action {
  readonly type = AlbumActionType.GET_ALBUM_PHOTOS_FAILURE;
  constructor (public payload: any) {}
}
export class GetMoreAlbumPhotos implements Action {
  readonly type = AlbumActionType.GET_MORE_ALBUM_PHOTOS;
  constructor (public payload: {memorial_id: string, index: number}) {}
}
export class GetMoreAlbumPhotosSuccess implements Action {
  readonly type = AlbumActionType.GET_MORE_ALBUM_PHOTOS_SUCCESS;
  constructor (public payload: Photo[]) {}
}
export class GetMoreAlbumPhotosFailure implements Action {
  readonly type = AlbumActionType.GET_MORE_ALBUM_PHOTOS_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateAlbumPhoto implements Action {
  readonly type = AlbumActionType.UPDATE_ALBUM_PHOTO;
  constructor (public payload: {photo_id: string, body: {title?: string, description?: string}}) {}
}
export class UpdateAlbumPhotoSuccess implements Action {
  readonly type = AlbumActionType.UPDATE_ALBUM_PHOTO_SUCCESS;
  constructor (public payload: Photo) {}
}
export class UpdateAlbumPhotoFailure implements Action {
  readonly type = AlbumActionType.UPDATE_ALBUM_PHOTO_FAILURE;
  constructor (public payload: any) {}
}

export class UploadAlbumPhoto implements Action {
  readonly type = AlbumActionType.UPLOAD_ALBUM_PHOTO;
  constructor (public payload: any) {}
}
export class UploadAlbumPhotoSuccess implements Action {
  readonly type = AlbumActionType.UPLOAD_ALBUM_PHOTO_SUCCESS;
  constructor (public payload: Photo) {}
}
export class UploadAlbumPhotoFailure implements Action {
  readonly type = AlbumActionType.UPLOAD_ALBUM_PHOTO_FAILURE;
  constructor (public payload: any) {}
}

export class DeletePhoto implements Action {
  readonly type = AlbumActionType.DELETE_PHOTO;
  constructor (public payload: {photo_id: string, file: string}) {}
}
export class DeletePhotoSuccess implements Action {
  readonly type = AlbumActionType.DELETE_PHOTO_SUCCESS;
  constructor (public payload: {message: string, id: string}) {}
}
export class DeletePhotoFailure implements Action {
  readonly type = AlbumActionType.DELETE_PHOTO_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetAlbumPhotos
  | GetAlbumPhotosSuccess
  | GetAlbumPhotosFailure
  | GetMoreAlbumPhotos
  | GetMoreAlbumPhotosSuccess
  | GetMoreAlbumPhotosFailure
  | UpdateAlbumPhoto
  | UpdateAlbumPhotoSuccess
  | UpdateAlbumPhotoFailure
  | UploadAlbumPhoto
  | UploadAlbumPhotoSuccess
  | UploadAlbumPhotoFailure
  | DeletePhoto
  | DeletePhotoSuccess
  | DeletePhotoFailure;
