import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { CreateMemorialService } from 'app/create-memorial/services/create-memorial.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  AddTimelineEntry,
  AddTimelineEntryFaiure,
  AddTimelineEntrySuccess,
  CreateMemorialActionTypes,
  GetCreateMemorial,
  GetCreateMemorialFailure,
  GetCreateMemorialSuccess,
  RemoveTimelineEntry,
  RemoveTimelineEntryFaiure,
  RemoveTimelineEntrySuccess,
  UpdateCreateMemorial,
  UpdateCreateMemorialFailure,
  UpdateCreateMemorialSuccess,
} from './create-memorial.actions';


@Injectable()
export class CreateMemorialEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService,
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

}
