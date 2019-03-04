import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CreateMemorialService } from './../../create-memorial/services/create-memorial.service';
import { CreatePhotosActionTypes, GetCreatePhotos, GetCreatePhotosFailure, GetCreatePhotosSuccess } from './photos.actions';

@Injectable()
export class CreatePhotosEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService
  ) {}

  @Effect()
  getCreatePhotos$: Observable<Action> = this.actions.pipe(
    ofType(CreatePhotosActionTypes.GET_CREATE_PHOTOS),
    switchMap((action: GetCreatePhotos) => this.api.getCreatePhotos(action.payload).pipe(
      map(res => new GetCreatePhotosSuccess(res)),
      catchError(error => of(new GetCreatePhotosFailure(error)))
    )),
  );

}
