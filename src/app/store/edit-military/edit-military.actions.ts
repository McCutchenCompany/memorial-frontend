import { Action } from '@ngrx/store';

export enum EditMilitaryActionTypes {
  GET_MILITARY_BRANCHES = '[Edit Military] Get military branches',
  GET_MILITARY_BRANCHES_SUCCESS = '[Edit Military] Get military branches success',
  GET_MILITARY_BRANCHES_FAILURE = '[Edit Military] Get military branches failure',
  GET_BRANCH_MEDALS = '[Edit Military] Get branch medals',
  GET_BRANCH_MEDALS_SUCCESS = '[Edit Military] Get branch medals success',
  GET_BRANCH_MEDALS_FAILURE = '[Edit Military] Get branch medals failure',
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


export type All =
  | GetMilitaryBranches
  | GetMilitaryBranchesSuccess
  | GetMilitaryBranchesFailure
  | GetBranchMedals
  | GetBranchMedalsSuccess
  | GetBranchMedalsFailure;
