import { Action } from '@ngrx/store';

export enum EditMilitaryActionTypes {
  GET_MILITARY_BRANCHES = '[Edit Military] Get military branches',
  GET_MILITARY_BRANCHES_SUCCESS = '[Edit Military] Get military branches success',
  GET_MILITARY_BRANCHES_FAILURE = '[Edit Military] Get military branches failure',
  GET_BRANCH_MEDALS = '[Edit Military] Get branch medals',
  GET_BRANCH_MEDALS_SUCCESS = '[Edit Military] Get branch medals success',
  GET_BRANCH_MEDALS_FAILURE = '[Edit Military] Get branch medals failure',
  GET_BRANCH_RANKS = '[Edit Military] Get branch ranks',
  GET_BRANCH_RANKS_SUCCESS = '[Edit Military] Get branch ranks success',
  GET_BRANCH_RANKS_FAILURE = '[Edit Military] Get branch ranks failure'
}

export class GetMilitaryBranches implements Action {
  readonly type = EditMilitaryActionTypes.GET_MILITARY_BRANCHES;
}
export class GetMilitaryBranchesSuccess implements Action {
  readonly type = EditMilitaryActionTypes.GET_MILITARY_BRANCHES_SUCCESS;
  constructor (public payload: any) {}
}
export class GetMilitaryBranchesFailure implements Action {
  readonly type = EditMilitaryActionTypes.GET_MILITARY_BRANCHES_FAILURE;
  constructor (public payload: any) {}
}

export class GetBranchMedals implements Action {
  readonly type = EditMilitaryActionTypes.GET_BRANCH_MEDALS;
  constructor (public payload: string) {}
}
export class GetBranchMedalsSuccess implements Action {
  readonly type = EditMilitaryActionTypes.GET_BRANCH_MEDALS_SUCCESS;
  constructor (public payload: any) {}
}
export class GetBranchMedalsFailure implements Action {
  readonly type = EditMilitaryActionTypes.GET_BRANCH_MEDALS_FAILURE;
  constructor (public payload: any) {}
}

export class GetBranchRanks implements Action {
  readonly type = EditMilitaryActionTypes.GET_BRANCH_RANKS;
  constructor (public payload: string) {}
}
export class GetBranchRanksSuccess implements Action {
  readonly type = EditMilitaryActionTypes.GET_BRANCH_RANKS_SUCCESS;
  constructor (public payload: any[]) {}
}
export class GetBranchRanksFailure implements Action {
  readonly type = EditMilitaryActionTypes.GET_BRANCH_RANKS_FAILURE;
  constructor (public payload: any) {}
}


export type All =
  | GetMilitaryBranches
  | GetMilitaryBranchesSuccess
  | GetMilitaryBranchesFailure
  | GetBranchMedals
  | GetBranchMedalsSuccess
  | GetBranchMedalsFailure
  | GetBranchRanks
  | GetBranchRanksSuccess
  | GetBranchRanksFailure;
