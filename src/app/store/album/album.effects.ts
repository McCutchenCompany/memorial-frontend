import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Photo } from '@shared/models/photo.model';
import { ImageUploadService } from '@shared/services/image-upload.service';
import {
  AlbumActionType,
  DeletePhoto,
  DeletePhotoFailure,
  DeletePhotoSuccess,
  GetAlbumPhotos,
  GetAlbumPhotosFailure,
  GetAlbumPhotosSuccess,
  GetMoreAlbumPhotos,
  GetMoreAlbumPhotosFailure,
  GetMoreAlbumPhotosSuccess,
  UpdateAlbumPhoto,
  UpdateAlbumPhotoFailure,
  UpdateAlbumPhotoSuccess,
  UploadAlbumPhoto,
  UploadAlbumPhotoFailure,
  UploadAlbumPhotoSuccess,
} from '@store/album/album.actions';
import { getViewMemorial } from '@store/view-memorial';
import { AddPhotoToCount, RemovePhotoFromCount } from '@store/view-memorial/view-memorial.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ViewMemorialService } from './../../view-memorial/services/view-memorial.service';

@Injectable()
export class AlbumEffects {
  constructor(
    private actions: Actions,
    private api: ViewMemorialService,
    private upload: ImageUploadService,
    private store: Store<any>
  ) {}

  @Effect()
  getAlbumPhotos$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.GET_ALBUM_PHOTOS),
    switchMap((action: GetAlbumPhotos) => this.api.getAlbumPhotos(action.payload.memorial_id, 0).pipe(
      map((res: Photo[]) => new GetAlbumPhotosSuccess(res)),
      catchError(error => of(new GetAlbumPhotosFailure(error)))
    ))
  );

  @Effect()
  getMoreAlbumPhotos$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.GET_MORE_ALBUM_PHOTOS),
    switchMap((action: GetMoreAlbumPhotos) => this.api.getAlbumPhotos(action.payload.memorial_id, action.payload.index).pipe(
      map((res: Photo[]) => new GetMoreAlbumPhotosSuccess(res)),
      catchError(error => of(new GetMoreAlbumPhotosFailure(error)))
    ))
  );

  @Effect()
  updateAlbumPhoto$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.UPDATE_ALBUM_PHOTO),
    switchMap((action: UpdateAlbumPhoto) => this.api.updatePhoto(action.payload.photo_id, action.payload.body).pipe(
      map((photo: Photo) => new UpdateAlbumPhotoSuccess(photo)),
      catchError(error => of(new UpdateAlbumPhotoFailure(error)))
    ))
  );

  @Effect()
  uploadAlbumPhoto$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.UPLOAD_ALBUM_PHOTO),
    switchMap((action: UploadAlbumPhoto) => this.upload.uploadAlbumPhoto(action.payload.id, action.payload.file).pipe(
      map((res: Photo) => new UploadAlbumPhotoSuccess(res)),
      catchError(error => of(new UploadAlbumPhotoFailure(error)))
    ))
  );

  @Effect()
  uploadAlbumPhotoSuccess$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.UPLOAD_ALBUM_PHOTO_SUCCESS),
    map(() => new AddPhotoToCount())
  );

  @Effect()
  deletePhoto$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.DELETE_PHOTO),
    switchMap((action: DeletePhoto) => this.upload.deleteAlbumPhoto(action.payload.photo_id, action.payload.file).pipe(
      map((res: {message: string, id: string}) => new DeletePhotoSuccess(res)),
      catchError(error => of(new DeletePhotoFailure(error)))
    ))
  );

  @Effect()
  deletePhotosSuccess$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.DELETE_PHOTO_SUCCESS),
    withLatestFrom(this.store.pipe(select(getViewMemorial))),
    map(() => new RemovePhotoFromCount())
  );

}
