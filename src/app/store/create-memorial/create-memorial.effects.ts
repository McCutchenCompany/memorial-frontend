import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ImageUploadService } from '@shared/services/image-upload.service';
import { CreateMemorialService } from 'app/create-memorial/services/create-memorial.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  AddTimelineEntry,
  AddTimelineEntryFaiure,
  AddTimelineEntrySuccess,
  CreateMemorialActionTypes,
  DeleteMemorialImage,
  DeleteMemorialImageFailure,
  DeleteMemorialImageSuccess,
  GetCreateMemorial,
  GetCreateMemorialFailure,
  GetCreateMemorialSuccess,
  RemoveTimelineEntry,
  RemoveTimelineEntryFaiure,
  RemoveTimelineEntrySuccess,
  ReplaceMemorialImage,
  ReplaceMemorialImageFailure,
  ReplaceMemorialImageSuccess,
  UpdateCreateMemorial,
  UpdateCreateMemorialFailure,
  UpdateCreateMemorialSuccess,
  UploadMemorialImage,
  UploadMemorialImageFailure,
  UploadMemorialImageSuccess,
} from './create-memorial.actions';


@Injectable()
export class CreateMemorialEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService,
    private uploadService: ImageUploadService,
    private router: Router
  ) {}

  @Effect()
  getCreateMemorial$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.GET_CREATE_MEMORIAL),
    switchMap((action: GetCreateMemorial) => this.api.getCreateMemorial(action.payload).pipe(
      map(memorial => new GetCreateMemorialSuccess(memorial)),
      catchError(error => of(new GetCreateMemorialFailure(error)))
    ))
  );

  @Effect()
  updateCreateMemorial$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL),
    switchMap((action: UpdateCreateMemorial) => this.api.updateCreateMemorial(action.payload.uuid, action.payload.body).pipe(
      map(res => new UpdateCreateMemorialSuccess(res)),
      catchError(error => of(new UpdateCreateMemorialFailure(error)))
    ))
  );

  @Effect()
  addTimelineEntry$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.ADD_TIMELINE_ENTRY),
    switchMap((action: AddTimelineEntry) => this.api.addTimelineEntry(action.payload.uuid, action.payload.body).pipe(
      map(res => new AddTimelineEntrySuccess(res)),
      catchError(error => of(new AddTimelineEntryFaiure(error)))
    ))
  );

  @Effect()
  removeTimelineEntry$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.REMOVE_TIMELINE_ENTRY),
    switchMap((action: RemoveTimelineEntry) => this.api.removeTimelineEntry(action.payload).pipe(
      map(res => new RemoveTimelineEntrySuccess(res)),
      catchError(error => of(new RemoveTimelineEntryFaiure(error)))
    ))
  );

  @Effect()
  uploadMemorialImage$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE),
    switchMap((action: UploadMemorialImage) => this.uploadService.uploadImage(action.payload.id, action.payload.image).pipe(
      map(memorial => new UploadMemorialImageSuccess(memorial)),
      catchError(error => of(new UploadMemorialImageFailure(error)))
    ))
  );

  @Effect()
  deleteMemorialImage$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE),
    switchMap((action: DeleteMemorialImage) => this.uploadService.removeImage(action.payload.memorial_id, action.payload.route).pipe(
      map(memorial => new DeleteMemorialImageSuccess(memorial)),
      catchError(error => of(new DeleteMemorialImageFailure(error)))
    ))
  );

  @Effect()
  replaceMemorialImage$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE),
    switchMap((action: ReplaceMemorialImage) => this.uploadService.replaceImage(action.payload.id, action.payload.image).pipe(
      map(memorial => new ReplaceMemorialImageSuccess(memorial)),
      catchError(error => of(new ReplaceMemorialImageFailure(error)))
    ))
  );

}
