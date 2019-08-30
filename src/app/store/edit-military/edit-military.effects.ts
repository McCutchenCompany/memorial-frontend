import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { EditMilitaryService } from './../../create-memorial/services/edit-military.service';
import {
  EditMilitaryActionTypes,
  GetBranchMedals,
  GetBranchMedalsFailure,
  GetBranchMedalsSuccess,
  GetBranchRanks,
  GetBranchRanksFailure,
  GetBranchRanksSuccess,
  GetMilitaryBranches,
  GetMilitaryBranchesFailure,
  GetMilitaryBranchesSuccess,
} from './edit-military.actions';

@Injectable()
export class EditMilitaryEffects {
  constructor(
    private actions: Actions,
    private api: EditMilitaryService,
    private store: Store<any>
  ) {}

  @Effect()
  getMilitaryBranches$: Observable<Action> = this.actions.pipe(
    ofType(EditMilitaryActionTypes.GET_MILITARY_BRANCHES),
    switchMap((action: GetMilitaryBranches) => this.api.getMilitaryBranches().pipe(
      map(res => new GetMilitaryBranchesSuccess(res)),
      catchError(error => of(new GetMilitaryBranchesFailure(error)))
    ))
  );

  @Effect()
  getBranchMedals$: Observable<Action> = this.actions.pipe(
    ofType(EditMilitaryActionTypes.GET_BRANCH_MEDALS),
    switchMap((action: GetBranchMedals) => this.api.getBranchMedals(action.payload).pipe(
      map(res => new GetBranchMedalsSuccess(res)),
      catchError(error => of(new GetBranchMedalsFailure(error)))
    ))
  );

  @Effect()
  getBranchRanks$: Observable<Action> = this.actions.pipe(
    ofType(EditMilitaryActionTypes.GET_BRANCH_RANKS),
    switchMap((action: GetBranchRanks) => this.api.getBranchRanks(action.payload).pipe(
      map(res => new GetBranchRanksSuccess(res)),
      catchError(error => of(new GetBranchRanksFailure(error)))
    ))
  );

}
