import { Action } from '@ngrx/store';
import { Paginator } from '@shared/models/paginator.model';

export enum MemorialMemberActionTypes {
  GET_FIRST_MEMORIAL_MEMBERS = '[Memorial Members] Get first Memorial members',
  GET_MEMORIAL_MEMBERS = '[Memorial Members] Get Memorial members',
  GET_MEMORIAL_MEMBERS_SUCCESS = '[Memorial Members] Get Memorial members success',
  GET_MEMORIAL_MEMBERS_FAILURE = '[Memorial Members] Get Memorial members failure'
}

export class GetFirstMemorialMembers implements Action {
  readonly type = MemorialMemberActionTypes.GET_FIRST_MEMORIAL_MEMBERS;
  constructor (public payload: string) {}
}
export class GetMemorialMembers implements Action {
  readonly type = MemorialMemberActionTypes.GET_MEMORIAL_MEMBERS;
  constructor (public payload: {id: string, paginator: Paginator}) {}
}
export class GetMemorialMembersSuccess implements Action {
  readonly type = MemorialMemberActionTypes.GET_MEMORIAL_MEMBERS_SUCCESS;
  constructor (public payload: {results: any[], pagination: Paginator, organization?: any}) {}
}
export class GetMemorialMembersFailure implements Action {
  readonly type = MemorialMemberActionTypes.GET_MEMORIAL_MEMBERS_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetFirstMemorialMembers
  | GetMemorialMembers
  | GetMemorialMembersSuccess
  | GetMemorialMembersFailure;
