import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Timeline } from '@shared/models/timeline.model';
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
  RemoveTimelineFile,
  RemoveTimelineFileFailure,
  RemoveTimelineFileSuccess,
  ReplaceMemorialImage,
  ReplaceMemorialImageFailure,
  ReplaceMemorialImageSuccess,
  UpdateCreateMemorial,
  UpdateCreateMemorialFailure,
  UpdateCreateMemorialSuccess,
  UpdateLocation,
  UpdateLocationFailure,
  UpdateLocationSuccess,
  UpdateMemoryStatus,
  UpdateMemoryStatusFailure,
  UpdateMemoryStatusSuccess,
  UpdateTimeline,
  UpdateTimelineFailure,
  UpdateTimelineSuccess,
  UploadMemorialImage,
  UploadMemorialImageFailure,
  UploadMemorialImageSuccess,
  UploadTimelineFile,
  UploadTimelineFileFailure,
  UploadTimelineFileSuccess,
} from './create-memorial.actions';


@Injectable()
export class CreateMemorialEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService,
    private uploadService: ImageUploadService
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
  updateTimeline$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.UPDATE_TIMELINE),
    switchMap((action: UpdateTimeline) => this.api.updateTimeline(action.payload.memorial_id, action.payload.timelines).pipe(
      map((res: Timeline[]) => new UpdateTimelineSuccess(res)),
      catchError(error => of(new UpdateTimelineFailure(error)))
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
    switchMap((action: DeleteMemorialImage) => this.uploadService.removeImage(action.payload.id, action.payload.route).pipe(
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

  @Effect()
  uploadTimelineFile$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.UPLOAD_TIMELINE_FILE),
    switchMap((action: UploadTimelineFile) => {
      return this.uploadService.uploadTimelineFile(action.payload.id, action.payload.file, action.payload.asset_type).pipe(
      map(memorial => new UploadTimelineFileSuccess(memorial)),
      catchError(error => of(new UploadTimelineFileFailure(error)))
    );
  }));

  @Effect()
  removeTimelineFile$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.REMOVE_TIMELINE_FILE),
    switchMap((action: RemoveTimelineFile) => this.uploadService.removeTimelineFile(action.payload.id, action.payload.route).pipe(
      map(memorial => new RemoveTimelineFileSuccess(memorial)),
      catchError(error => of(new RemoveTimelineFileFailure(error)))
    ))
  );

  @Effect()
  updateLocation$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.UPDATE_LOCATION),
    switchMap((action: UpdateLocation) => this.api.updateLocation(action.payload.id, action.payload.location).pipe(
      map(res => new UpdateLocationSuccess(res)),
      catchError(error => of(new UpdateLocationFailure(error)))
    ))
  );

  @Effect()
  udpateMemoryStatus$: Observable<Action> = this.actions.pipe(
    ofType(CreateMemorialActionTypes.UPDATE_MEMORY_STATUS),
    switchMap((action: UpdateMemoryStatus) => this.api.updateMemoryStatus(action.payload.memory_id, action.payload.body).pipe(
      map(res => new UpdateMemoryStatusSuccess(res)),
      catchError(error => of(new UpdateMemoryStatusFailure(error)))
    ))
  );
}
