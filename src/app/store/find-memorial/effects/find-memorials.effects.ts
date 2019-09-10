import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
  findMemorialActionTypes,
  GetPopularMemorials,
  GetPopularMemorialsFailure,
  GetPopularMemorialsSuccess,
  SearchMemorials,
  SearchMemorialsFailure,
  SearchMemorialsSuccess,
} from '../actions/action.types';
import { getPositionState } from '../selectors/position.selector';
import { FindApiService } from './../../../find-memorial/services/find-api.service';
import { Memorial } from './../../../shared/models/memorial.model';
import { GetInRange, GetInRangeFailure, GetInRangeSuccess } from './../actions/action.types';

@Injectable()
export class FindMemorialsEffects {
  constructor(
    private actions: Actions,
    private store: Store<any>,
    private apiService: FindApiService
  ) {}

  @Effect()
  getInRangeMemorials$: Observable<Action> = this.actions.pipe(
    ofType(findMemorialActionTypes.GET_IN_RANGE),
    withLatestFrom(this.store.pipe(select(getPositionState))),
    switchMap(([action, pos]: [GetInRange, any]) => {
      const payload = {top: null, right: null, bottom: null, left: null};
      const height = action.payload.top - action.payload.bottom;
      const width = action.payload.left - action.payload.right;
      if (height > 0.05 || height < -0.05) {
        payload.top = action.payload.top;
        payload.bottom = action.payload.bottom;
      } else {
        payload.top = pos.latitude + 0.05;
        payload.bottom = pos.latitude - 0.05;
      }
      if (width > 0.05 || width < -0.05) {
        payload.left = action.payload.left;
        payload.right = action.payload.right;
      } else {
        payload.left = pos.longitude - 0.05;
        payload.right = pos.longitude + 0.05;
      }
      return this.apiService.getInRange(payload).pipe(
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

  @Effect()
  getPopularMemorials$: Observable<Action> = this.actions.pipe(
    ofType(findMemorialActionTypes.GET_POPULAR_MEMORIALS),
    switchMap((action: GetPopularMemorials) => this.apiService.getPopularMemorials().pipe(
      map(res => new GetPopularMemorialsSuccess(res)),
      catchError(error => of(new GetPopularMemorialsFailure(error)))
    ))
  );
}
