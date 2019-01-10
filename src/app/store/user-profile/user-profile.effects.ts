import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { CreateMemorialService } from 'app/create-memorial/services/create-memorial.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  CreateMemorial,
  CreateMemorialFailure,
  CreateMemorialSuccess,
  UserProfileActionTypes,
} from './user-profile.actions';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService,
    private router: Router,
  ) {}

  @Effect()
  createMemorial$: Observable<Action> = this.actions.pipe(
    ofType(UserProfileActionTypes.CREATE_MEMORIAL),
    switchMap((action: CreateMemorial) => this.api.createMemorial(action.payload).pipe(
      map(res => new CreateMemorialSuccess(res)),
      catchError(error => of(new CreateMemorialFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  createMemorialSuccess$ = this.actions.pipe(
    ofType(UserProfileActionTypes.CREATE_MEMORIAL_SUCCESS),
    map((action: CreateMemorialSuccess) => {
      this.router.navigateByUrl(`/create/${action.payload.uuid}`);
    })
  );
}
