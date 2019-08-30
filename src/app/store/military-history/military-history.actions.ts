import { Action } from '@ngrx/store';

import { MilitaryHistory } from './../../shared/models/military.model';

export enum MilitaryHistoryActionTypes {
  GET_MILITARY_HISTORY = '[Military History] Get edit military history',
  GET_MILITARY_HISTORY_SUCCESS = '[Military History] Get edit military history success',
  GET_MILITARY_HISTORY_FAILURE = '[Military History] Get edit military history failure',
  ADD_MILITARY_BRANCH = '[Military History] Add military branch',
  ADD_MILITARY_BRANCH_SUCCESS = '[Military History] Add military branch success',
  ADD_MILITARY_BRANCH_FAILURE = '[Military History] Add military branch failure',
  REMOVE_MILITARY_BRANCH = '[Military History] Remove military branch',
  REMOVE_MILITARY_BRANCH_SUCCESS = '[Military History] Remove military branch success',
  REMOVE_MILITARY_BRANCH_FAILURE = '[Military History] Remove military branch failure',
  ADD_MEDAL = '[Military History] Add medal',
  ADD_MEDAL_SUCCESS = '[Military History] Add medal success',
  ADD_MEDAL_FAILURE = '[Military History] Add medal failure',
  REMOVE_MEDAL = '[Military History] Remove medal',
  REMOVE_MEDAL_SUCCESS = '[Military History] Remove medal success',
  REMOVE_MEDAL_FAILURE = '[Military History] Remove medal failure',
  UPDATE_MILITARY_DATES = '[Military History] Update military dates',
  UPDATE_MILITARY_DATES_SUCCESS = '[Military History] Update military dates success',
  UPDATE_MILITARY_DATES_FAILURE = '[Military History] Update military dates failure',
  UPDATE_BRANCH_RANK = '[Military History] Update branch rank',
  UPDATE_BRANCH_RANK_SUCCESS = '[Military History] Update branch rank success',
  UPDATE_BRANCH_RANK_FAILURE = '[Military History] Update branch rank failure'
}

export class GetMilitaryHistory implements Action {
  readonly type = MilitaryHistoryActionTypes.GET_MILITARY_HISTORY;
}
export class GetMilitaryHistorySuccess implements Action {
  readonly type = MilitaryHistoryActionTypes.GET_MILITARY_HISTORY_SUCCESS;
  constructor (public payload: any) {}
}
export class GetMilitaryHistoryFailure implements Action {
  readonly type = MilitaryHistoryActionTypes.GET_MILITARY_HISTORY_FAILURE;
  constructor (public payload: any) {}
}

export class AddMilitaryBranch implements Action {
  readonly type = MilitaryHistoryActionTypes.ADD_MILITARY_BRANCH;
  constructor (public payload: string) {}
}
export class AddMilitaryBranchSuccess implements Action {
  readonly type = MilitaryHistoryActionTypes.ADD_MILITARY_BRANCH_SUCCESS;
  constructor (public payload: MilitaryHistory[]) {}
}
export class AddMilitaryBranchFailure implements Action {
  readonly type = MilitaryHistoryActionTypes.ADD_MILITARY_BRANCH_FAILURE;
  constructor (public payload: any) {}
}

export class RemoveMilitaryBranch implements Action {
  readonly type = MilitaryHistoryActionTypes.REMOVE_MILITARY_BRANCH;
  constructor (public payload: string) {}
}
export class RemoveMilitaryBranchSuccess implements Action {
  readonly type = MilitaryHistoryActionTypes.REMOVE_MILITARY_BRANCH_SUCCESS;
  constructor (public payload: MilitaryHistory[]) {}
}
export class RemoveMilitaryBranchFailure implements Action {
  readonly type = MilitaryHistoryActionTypes.REMOVE_MILITARY_BRANCH_FAILURE;
  constructor (public payload: any) {}
}

export class AddMedal implements Action {
  readonly type = MilitaryHistoryActionTypes.ADD_MEDAL;
  constructor (public payload: {branch_id: string, medal_id: string}) {}
}
export class AddMedalSuccess implements Action {
  readonly type = MilitaryHistoryActionTypes.ADD_MEDAL_SUCCESS;
  constructor (public payload: MilitaryHistory[]) {}
}
export class AddMedalFailure implements Action {
  readonly type = MilitaryHistoryActionTypes.ADD_MEDAL_FAILURE;
  constructor (public payload: any) {}
}

export class RemoveMedal implements Action {
  readonly type = MilitaryHistoryActionTypes.REMOVE_MEDAL;
  constructor (public payload: string) {}
}
export class RemoveMedalSuccess implements Action {
  readonly type = MilitaryHistoryActionTypes.REMOVE_MEDAL_SUCCESS;
  constructor (public payload: MilitaryHistory[]) {}
}
export class RemoveMedalFailure implements Action {
  readonly type = MilitaryHistoryActionTypes.REMOVE_MEDAL_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateMilitaryDates implements Action {
  readonly type = MilitaryHistoryActionTypes.UPDATE_MILITARY_DATES;
  constructor (public payload: {id: string, body: {start_date: string, end_date: string}}) {}
}
export class UpdateMilitaryDatesSuccess implements Action {
  readonly type = MilitaryHistoryActionTypes.UPDATE_MILITARY_DATES_SUCCESS;
  constructor (public payload: MilitaryHistory[]) {}
}
export class UpdateMilitaryDatesFailure implements Action {
  readonly type = MilitaryHistoryActionTypes.UPDATE_MILITARY_DATES_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateBranchRank implements Action {
  readonly type = MilitaryHistoryActionTypes.UPDATE_BRANCH_RANK;
  constructor (public payload: {memorial_military_branch_id: string, military_rank_id: string}) {}
}
export class UpdateBranchRankSuccess implements Action {
  readonly type = MilitaryHistoryActionTypes.UPDATE_BRANCH_RANK_SUCCESS;
  constructor (public payload: MilitaryHistory[]) {}
}
export class UpdateBranchRankFailure implements Action {
  readonly type = MilitaryHistoryActionTypes.UPDATE_BRANCH_RANK_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetMilitaryHistory
  | GetMilitaryHistorySuccess
  | GetMilitaryHistoryFailure
  | AddMilitaryBranch
  | AddMilitaryBranchSuccess
  | AddMilitaryBranchFailure
  | RemoveMilitaryBranch
  | RemoveMilitaryBranchSuccess
  | RemoveMilitaryBranchFailure
  | AddMedal
  | AddMedalSuccess
  | AddMedalFailure
  | RemoveMedal
  | RemoveMedalSuccess
  | RemoveMedalFailure
  | UpdateMilitaryDates
  | UpdateMilitaryDatesSuccess
  | UpdateMilitaryDatesFailure
  | UpdateBranchRank
  | UpdateBranchRankSuccess
  | UpdateBranchRankFailure;
