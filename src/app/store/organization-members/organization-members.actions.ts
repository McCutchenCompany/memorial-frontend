import { Action } from '@ngrx/store';
import { Paginator } from '@shared/models/paginator.model';

export enum OrgMemberActionTypes {
  GET_FIRST_ORG_MEMBERS = '[Org Members] Get first org members',
  GET_ORG_MEMBERS = '[Org Members] Get org members',
  GET_ORG_MEMBERS_SUCCESS = '[Org Members] Get org members success',
  GET_ORG_MEMBERS_FAILURE = '[Org Members] Get org members failure'
}

export class GetFirstOrgMembers implements Action {
  readonly type = OrgMemberActionTypes.GET_FIRST_ORG_MEMBERS;
  constructor (public payload: string) {}
}
export class GetOrgMembers implements Action {
  readonly type = OrgMemberActionTypes.GET_ORG_MEMBERS;
  constructor (public payload: {id: string, paginator: Paginator}) {}
}
export class GetOrgMembersSuccess implements Action {
  readonly type = OrgMemberActionTypes.GET_ORG_MEMBERS_SUCCESS;
  constructor (public payload: {results: any[], pagination: Paginator}) {}
}
export class GetOrgMembersFailure implements Action {
  readonly type = OrgMemberActionTypes.GET_ORG_MEMBERS_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetFirstOrgMembers
  | GetOrgMembers
  | GetOrgMembersSuccess
  | GetOrgMembersFailure;
