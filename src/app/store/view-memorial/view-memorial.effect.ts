import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ViewMemorialService } from './../../view-memorial/services/view-memorial.service';
import {
  AddMemory,
  AddMemoryFailure,
  AddMemorySuccess,
  DeleteMemory,
  DeleteMemoryFailure,
  DeleteMemorySuccess,
  EditMemory,
  EditMemoryFailure,
  EditMemorySuccess,
  GetMemorial,
  GetMemorialFailure,
  GetMemorialSuccess,
  JoinMemorial,
  JoinMemorialFailure,
  JoinMemorialSuccess,
  ViewMemorialActionTypes,
} from './view-memorial.actions';

@Injectable()
export class ViewMemorialEffects {
  constructor(
    private actions: Actions,
    private api: ViewMemorialService,
    private router: Router
  ) {}

  @Effect()
  getMemorial$: Observable<Action> = this.actions.pipe(
    ofType(ViewMemorialActionTypes.GET_MEMORIAL),
    switchMap((action: GetMemorial) => this.api.getMemorial(action.payload).pipe(
      map(memorial => new GetMemorialSuccess(memorial)),
      catchError(error => of(new GetMemorialFailure(error)))
    ))
  );

  @Effect()
  addMemory$: Observable<Action> = this.actions.pipe(
    ofType(ViewMemorialActionTypes.ADD_MEMORY),
    switchMap((action: AddMemory) => this.api.addMemory(action.payload.memorial_id, action.payload.body).pipe(
      map(res => new AddMemorySuccess(res)),
      catchError(error => of(new AddMemoryFailure(error)))
    ))
  );

  @Effect()
  deleteMemory$: Observable<Action> = this.actions.pipe(
    ofType(ViewMemorialActionTypes.DELETE_MEMORY),
    switchMap((action: DeleteMemory) => this.api.deleteMemory(action.payload).pipe(
      map(memories => new DeleteMemorySuccess(memories)),
      catchError(error => of(new DeleteMemoryFailure(error)))
    ))
  );

  @Effect()
  editMemory$: Observable<Action> = this.actions.pipe(
    ofType(ViewMemorialActionTypes.EDIT_MEMORY),
    switchMap((action: EditMemory) => this.api.editMemory(action.payload.memory_id, action.payload.title, action.payload.description).pipe(
      map(res => new EditMemorySuccess(res)),
      catchError(error => of(new EditMemoryFailure(error)))
    ))
  );

  @Effect()
  joinMemorial$: Observable<Action> = this.actions.pipe(
    ofType(ViewMemorialActionTypes.JOIN_MEMORIAL),
    switchMap((action: JoinMemorial) => this.api.joinMemorial(action.payload).pipe(
      map(res => new JoinMemorialSuccess(res)),
      catchError(error => of(new JoinMemorialFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  joinMemorialSuccess$ = this.actions.pipe(
    ofType(ViewMemorialActionTypes.JOIN_MEMORIAL_SUCCESS),
    map((action: JoinMemorialSuccess) => this.router.navigate(['/create', action.payload.uuid]))
  );

}
