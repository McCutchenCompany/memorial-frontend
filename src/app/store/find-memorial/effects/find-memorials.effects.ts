import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  findMemorialActionTypes,
  SearchMemorials,
  SearchMemorialsFailure,
  SearchMemorialsSuccess,
} from '../actions/action.types';
import { FindApiService } from './../../../find-memorial/services/find-api.service';
import { Memorial } from './../../../shared/models/memorial.model';
import { GetInRange, GetInRangeFailure, GetInRangeSuccess } from './../actions/action.types';

@Injectable()
export class FindMemorialsEffects {
  constructor(
    private actions: Actions,
    private apiService: FindApiService
  ) {}

  @Effect()
  getInRangeMemorials$: Observable<Action> = this.actions.pipe(
    ofType(findMemorialActionTypes.GET_IN_RANGE),
    switchMap((action: GetInRange) => {
      return this.apiService.getInRange(action.payload).pipe(
        map(markers => new GetInRangeSuccess(markers)),
        catchError(error => of(new GetInRangeFailure(error)))
      );
    })
  );

  @Effect()
  searchMemorials$: Observable<Action> = this.actions.pipe(
    ofType(findMemorialActionTypes.SEARCH_MEMORIALS),
    switchMap((action: SearchMemorials) => this.apiService.searchMemorials(action.payload).pipe(
      map((memorials: Memorial[]) => new SearchMemorialsSuccess(memorials)),
      catchError(error => of(new SearchMemorialsFailure(error)))
    ))
  );
}
