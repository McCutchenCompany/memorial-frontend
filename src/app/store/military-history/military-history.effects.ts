import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { getRouterState } from '@store/router/router.reducer';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { EditMilitaryService } from './../../create-memorial/services/edit-military.service';
import { MilitaryHistory } from './../../shared/models/military.model';
import {
  AddMedal,
  AddMedalFailure,
  AddMedalSuccess,
  AddMilitaryBranch,
  AddMilitaryBranchFailure,
  AddMilitaryBranchSuccess,
  GetMilitaryHistory,
  GetMilitaryHistoryFailure,
  GetMilitaryHistorySuccess,
  MilitaryHistoryActionTypes,
  RemoveMedal,
  RemoveMedalFailure,
  RemoveMedalSuccess,
  RemoveMilitaryBranch,
  RemoveMilitaryBranchFailure,
  RemoveMilitaryBranchSuccess,
  UpdateBranchRank,
  UpdateBranchRankFailure,
  UpdateBranchRankSuccess,
  UpdateMilitaryDates,
  UpdateMilitaryDatesFailure,
  UpdateMilitaryDatesSuccess,
} from './military-history.actions';

@Injectable()
export class MilitaryHistoryEffects {
  constructor(
    private actions: Actions,
    private api: EditMilitaryService,
    private store: Store<any>
  ) {}

  @Effect()
  getMemorialMilitary$: Observable<Action> = this.actions.pipe(
    ofType(MilitaryHistoryActionTypes.GET_MILITARY_HISTORY),
    withLatestFrom(this.store.pipe(select(getRouterState))),
    switchMap(([action, router]: [GetMilitaryHistory, any]) => {
      return this.api.getMemorialMilitaryHistory(router.state.root.children[0].firstChild.params.id).pipe(
      map(res => new GetMilitaryHistorySuccess(res)),
      catchError(error => of(new GetMilitaryHistoryFailure(error)))
      );
    })
  );

  @Effect()
  addMilitaryBranch$: Observable<Action> = this.actions.pipe(
    ofType(MilitaryHistoryActionTypes.ADD_MILITARY_BRANCH),
    withLatestFrom(this.store.pipe(select(getRouterState))),
    switchMap(([action, router]: [AddMilitaryBranch, any]) => {
      return this.api.addMilitaryBranch(router.state.root.children[0].firstChild.params.id, action.payload).pipe(
        map((res: MilitaryHistory[]) => new AddMilitaryBranchSuccess(res)),
        catchError(error => of(new AddMilitaryBranchFailure(error)))
      );
    })
  );

  @Effect()
  removeMilitaryBranch$: Observable<Action> = this.actions.pipe(
    ofType(MilitaryHistoryActionTypes.REMOVE_MILITARY_BRANCH),
    switchMap((action: RemoveMilitaryBranch) => this.api.removeMilitaryBranch(action.payload).pipe(
      map((res: MilitaryHistory[]) => new RemoveMilitaryBranchSuccess(res)),
      catchError(error => of(new RemoveMilitaryBranchFailure(error)))
    ))
  );

  @Effect()
  addMedal$: Observable<Action> = this.actions.pipe(
    ofType(MilitaryHistoryActionTypes.ADD_MEDAL),
    withLatestFrom(this.store.pipe(select(getRouterState))),
    switchMap(([action, router]: [AddMedal, any]) => {
      return this.api.addMedal(router.state.root.children[0].firstChild.params.id, action.payload.branch_id, action.payload.medal_id).pipe(
        map((res: MilitaryHistory[]) => new AddMedalSuccess(res)),
        catchError(error => of(new AddMedalFailure(error)))
      );
    })
  );

  @Effect()
  removeMedal$: Observable<Action> = this.actions.pipe(
    ofType(MilitaryHistoryActionTypes.REMOVE_MEDAL),
    switchMap((action: RemoveMedal) => this.api.removeMedal(action.payload).pipe(
      map((res: MilitaryHistory[]) => new RemoveMedalSuccess(res)),
      catchError(error => of(new RemoveMedalFailure(error)))
    ))
  );

  @Effect()
  updateMilitaryDates$: Observable<Action> = this.actions.pipe(
    ofType(MilitaryHistoryActionTypes.UPDATE_MILITARY_DATES),
    switchMap((action: UpdateMilitaryDates) => this.api.updateMilitaryDates(action.payload.id, action.payload.body).pipe(
      map(((res: MilitaryHistory[]) => new UpdateMilitaryDatesSuccess(res))),
      catchError(error => of(new UpdateMilitaryDatesFailure(error)))
    ))
  );

  @Effect()
  updateBranchRank$: Observable<Action> = this.actions.pipe(
    ofType(MilitaryHistoryActionTypes.UPDATE_BRANCH_RANK),
    switchMap((action: UpdateBranchRank) => {
      return this.api.updateBranchRank(action.payload.memorial_military_branch_id, action.payload.military_rank_id).pipe(
        map((res: MilitaryHistory[]) => new UpdateBranchRankSuccess(res)),
        catchError(error => of(new UpdateBranchRankFailure(error)))
      );
    })
  );
}
