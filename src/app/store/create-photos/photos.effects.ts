import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Photo } from '@shared/models/photo.model';
import { getCreateMemorial } from '@store/create-memorial';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { CreateMemorialService } from './../../create-memorial/services/create-memorial.service';
import { ImageUploadService } from './../../shared/services/image-upload.service';
import {
  ApproveDeniedPhotoSuccess,
  ApproveNeedApprovalPhotoSuccess,
  ApprovePhoto,
  ApprovePhotoFailure,
  CreatePhotosActionTypes,
  DenyApprovedPhotoSuccess,
  DenyNeedApprovalPhotoSuccess,
  DenyPhoto,
  DenyPhotoFailure,
  GetCreatePhotos,
  GetCreatePhotosFailure,
  GetCreatePhotosSuccess,
  UpdateCreateAllPhotoSuccess,
  UpdateCreateApprovedPhotoSuccess,
  UpdateCreateDeniedPhotoSuccess,
  UpdateCreateNeedApprovalPhotoSuccess,
  UpdateCreatePhoto,
  UpdateCreatePhotoFailure,
  UploadCreatePhoto,
  UploadCreatePhotoFailure,
  UploadCreatePhotoSuccess,
} from './photos.actions';
import { getNeedApprovalPhotoIds } from './reducers';

@Injectable()
export class CreatePhotosEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService,
    private upload: ImageUploadService,
    private store: Store<any>
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

  @Effect()
  updateCreatePhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.UPDATE_CREATE_PHOTO),
    withLatestFrom(this.store.pipe(select(getCreateMemorial))),
    switchMap(([action, memorial]: [UpdateCreatePhoto, any]) => {
      return this.api.updatePhoto(action.payload.photo_id, action.payload.body).pipe(
      map((res: Photo) => {
        if (memorial.memorial.public_photo) {
          return new UpdateCreateAllPhotoSuccess(res);
        } else if (res.denied) {
          return new UpdateCreateDeniedPhotoSuccess(res);
        } else if (res.published) {
          return new UpdateCreateApprovedPhotoSuccess(res);
        } else {
          return new UpdateCreateNeedApprovalPhotoSuccess(res);
        }
      }),
      catchError(error => of(new UpdateCreatePhotoFailure(error)))
    );
  }));

  @Effect()
  approvePhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.APPROVE_PHOTO),
    withLatestFrom(this.store.pipe(select(getNeedApprovalPhotoIds))),
    switchMap(([action, ids]: [ApprovePhoto, string[]]) => {
      return this.api.updatePhotoApproval(action.payload.photo_id, action.payload.memorial_id, {published: true, denied: false}).pipe(
        map((res: Photo) => {
          if (ids.includes(res.uuid)) {
            return new ApproveNeedApprovalPhotoSuccess(res);
          } else {
            return new ApproveDeniedPhotoSuccess(res);
          }
        }),
        catchError(error => of(new ApprovePhotoFailure(error)))
    );
  }));

  @Effect()
  denyPhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.DENY_PHOTO),
    withLatestFrom(this.store.pipe(select(getNeedApprovalPhotoIds))),
    switchMap(([action, ids]: [DenyPhoto, string[]]) => {
      return this.api.updatePhotoApproval(action.payload.photo_id, action.payload.memorial_id, {published: false, denied: true}).pipe(
        map((res: Photo) => {
          if (ids.includes(res.uuid)) {
            return new DenyNeedApprovalPhotoSuccess(res);
          } else {
            return new DenyApprovedPhotoSuccess(res);
          }
        }),
        catchError(error => of(new DenyPhotoFailure(error)))
    );
  }));

}
