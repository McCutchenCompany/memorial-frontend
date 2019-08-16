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
  DeleteApprovedPhoto,
  DeleteApprovedPhotoFailure,
  DeleteApprovedPhotoSuccess,
  DeleteDeniedPhoto,
  DeleteDeniedPhotoFailure,
  DeleteDeniedPhotoSuccess,
  DeleteNeedApprovalPhoto,
  DeleteNeedApprovalPhotoFailure,
  DeleteNeedApprovalPhotoSuccess,
  DeleteOneFromAllPhoto,
  DeleteOneFromAllPhotoFailure,
  DeleteOneFromAllPhotoSuccess,
  DenyApprovedPhotoSuccess,
  DenyNeedApprovalPhotoSuccess,
  DenyPhoto,
  DenyPhotoFailure,
  GetCreatePhotos,
  GetCreatePhotosFailure,
  GetCreatePhotosSuccess,
  GetMorePhotos,
  GetMorePhotosFailure,
  GetMorePhotosSuccess,
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
import { getCreatePhotosCount, getNeedApprovalPhotoIds } from './reducers';

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
  getMorePhotos$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.GET_MORE_PHOTOS),
    switchMap((action: GetMorePhotos) => this.api.getCreatePhotos(action.payload).pipe(
      map(res => new GetMorePhotosSuccess(res)),
      catchError(error => of(new GetMorePhotosFailure(error)))
    ))
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
    withLatestFrom(this.store.pipe(select(getNeedApprovalPhotoIds)), this.store.pipe(select(getCreatePhotosCount))),
    switchMap(([action, ids, count]: [ApprovePhoto, any[], any]) => {
      return this.api.updatePhotoApproval(action.payload.photo_id, action.payload.memorial_id, {published: true, denied: false}).pipe(
        map((res: Photo) => {
          if (ids.includes(res.uuid)) {
            const payload = {
              count: {
                ...count,
                approved: count.approved + 1,
                need_approval: count.need_approval - 1
              },
              photo: res
            };
            return new ApproveNeedApprovalPhotoSuccess(payload);
          } else {
            const payload = {
              count: {
                ...count,
                denied: count.denied - 1,
                approved: count.approved + 1
              },
              photo: res
            };
            return new ApproveDeniedPhotoSuccess(payload);
          }
        }),
        catchError(error => of(new ApprovePhotoFailure(error)))
    );
  }));

  @Effect()
  denyPhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.DENY_PHOTO),
    withLatestFrom(this.store.pipe(select(getNeedApprovalPhotoIds)), this.store.pipe(select(getCreatePhotosCount))),
    switchMap(([action, ids, count]: [DenyPhoto, any[], any]) => {
      return this.api.updatePhotoApproval(action.payload.photo_id, action.payload.memorial_id, {published: false, denied: true}).pipe(
        map((res: Photo) => {
          if (ids.includes(res.uuid)) {
            const payload = {
              count: {
                ...count,
                need_approval: count.need_approval - 1,
                denied: count.denied + 1
              },
              photo: res
            };
            return new DenyNeedApprovalPhotoSuccess(payload);
          } else {
            const payload = {
              count: {
                ...count,
                approved: count.approved - 1,
                denied: count.denied + 1
              },
              photo: res
            };
            return new DenyApprovedPhotoSuccess(payload);
          }
        }),
        catchError(error => of(new DenyPhotoFailure(error)))
    );
  }));

  @Effect()
  deleteNeedApprovalPhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.DELETE_NEED_APPROVAL_PHOTO),
    switchMap((action: DeleteNeedApprovalPhoto) => this.upload.deleteAlbumPhoto(action.payload.photo_id, action.payload.file).pipe(
      map((res: {message: string, id: string}) => new DeleteNeedApprovalPhotoSuccess(res)),
      catchError(error => of(new DeleteNeedApprovalPhotoFailure(error)))
    ))
  );
  @Effect()
  deleteDeniedPhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.DELETE_DENIED_PHOTO),
    switchMap((action: DeleteDeniedPhoto) => this.upload.deleteAlbumPhoto(action.payload.photo_id, action.payload.file).pipe(
      map((res: {message: string, id: string}) => new DeleteDeniedPhotoSuccess(res)),
      catchError(error => of(new DeleteDeniedPhotoFailure(error)))
    ))
  );
  @Effect()
  deleteApprovedPhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.DELETE_APPROVED_PHOTO),
    switchMap((action: DeleteApprovedPhoto) => this.upload.deleteAlbumPhoto(action.payload.photo_id, action.payload.file).pipe(
      map((res: {message: string, id: string}) => new DeleteApprovedPhotoSuccess(res)),
      catchError(error => of(new DeleteApprovedPhotoFailure(error)))
    ))
  );
  @Effect()
  deleteOneFromAllPhoto$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.DELETE_ONE_FROM_ALL_PHOTO),
    switchMap((action: DeleteOneFromAllPhoto) => this.upload.deleteAlbumPhoto(action.payload.photo_id, action.payload.file).pipe(
      map((res: {message: string, id: string}) => new DeleteOneFromAllPhotoSuccess(res)),
      catchError(error => of(new DeleteOneFromAllPhotoFailure(error)))
    ))
  );

}
