import { Action } from '@ngrx/store';
import { Photo } from '@shared/models/photo.model';

export enum AlbumActionType {
  GET_ALBUM_PHOTOS = '[Album] Get album photos',
  GET_ALBUM_PHOTOS_SUCCESS = '[Album] Get album photos success',
  GET_ALBUM_PHOTOS_FAILURE = '[Album] Get album photos failure',
  GET_MORE_ALBUM_PHOTOS = '[Album] Get more album photos',
  GET_MORE_ALBUM_PHOTOS_SUCCESS = '[Album] Get more album photos success',
  GET_MORE_ALBUM_PHOTOS_FAILURE = '[Album] Get more album photos failure'
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

export type All =
  | GetAlbumPhotos
  | GetAlbumPhotosSuccess
  | GetAlbumPhotosFailure
  | GetMoreAlbumPhotos
  | GetMoreAlbumPhotosSuccess
  | GetMoreAlbumPhotosFailure;
