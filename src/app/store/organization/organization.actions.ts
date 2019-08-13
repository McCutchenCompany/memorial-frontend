import { Action } from '@ngrx/store';
import { Organization } from '@shared/models/organization.model';

export enum OrganizationActionTypes {
  CREATE_ORG = '[Organization] Create org',
  CREATE_ORG_SUCCESS = '[Organization] Create org success',
  CREATE_ORG_FAILURE = '[Organization] Create org failure',
  GET_ORG = '[Organization] Get org',
  GET_ORG_SUCCESS = '[Organization] Get org success',
  GET_ORG_FAILURE = '[Organization] Get org failure'
}

export class CreateOrg implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORG;
  constructor (public payload: any) {}
}
export class CreateOrgSuccess implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORG_SUCCESS;
  constructor (public payload: Organization) {}
}
export class CreateOrgFailure implements Action {
  readonly type = OrganizationActionTypes.CREATE_ORG_FAILURE;
  constructor (public payload: any) {}
}

export class GetOrg implements Action {
  readonly type = OrganizationActionTypes.GET_ORG;
  constructor (public payload: string) {}
}
export class GetOrgSuccess implements Action {
  readonly type = OrganizationActionTypes.GET_ORG_SUCCESS;
  constructor (public payload: Organization) {}
}
export class GetOrgFailure implements Action {
  readonly type = OrganizationActionTypes.GET_ORG_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | CreateOrg
  | CreateOrgSuccess
  | CreateOrgFailure
  | GetOrg
  | GetOrgSuccess
  | GetOrgFailure;
