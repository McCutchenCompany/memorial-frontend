import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CreateMemorialService } from './../../create-memorial/services/create-memorial.service';
import { ImageUploadService } from './../../shared/services/image-upload.service';
import {
  CreatePhotosActionTypes,
  GetCreatePhotos,
  GetCreatePhotosFailure,
  GetCreatePhotosSuccess,
  UploadCreatePhoto,
  UploadCreatePhotoFailure,
  UploadCreatePhotoSuccess,
} from './photos.actions';

@Injectable()
export class CreatePhotosEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService,
    private upload: ImageUploadService
  ) {}

  @Effect()
  getCreatePhotos$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.GET_CREATE_PHOTOS),
    switchMap((action: GetCreatePhotos) => this.api.getCreatePhotos(action.payload).pipe(
      map(res => new GetCreatePhotosSuccess(res)),
      catchError(error => of(new GetCreatePhotosFailure(error)))
    )),
  );

  @Effect()
  uploadCreatePhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO),
    switchMap((action: UploadCreatePhoto) => this.upload.uploadAlbumPhoto(action.payload.id, action.payload.file).pipe(
      map(res => new UploadCreatePhotoSuccess(res)),
      catchError(error => of(new UploadCreatePhotoFailure(error)))
    ))
  );

}
