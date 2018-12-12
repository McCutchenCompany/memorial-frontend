import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ViewMemorialService } from './../../view-memorial/services/view-memorial.service';
import { GetMemorial, GetMemorialFailure, GetMemorialSuccess, ViewMemorialActionTypes } from './view-memorial.actions';

@Injectable()
export class ViewMemorialEffects {
  constructor(
    private actions: Actions,
    private api: ViewMemorialService
  ) {}

  @Effect()
  getMemorial$: Observable<Action> = this.actions.pipe(
    ofType(ViewMemorialActionTypes.GET_MEMORIAL),
    switchMap((action: GetMemorial) => this.api.getMemorial(action.payload).pipe(
      map(memorial => new GetMemorialSuccess(memorial)),
      catchError(error => of(new GetMemorialFailure(error)))
    ))
  );
}
