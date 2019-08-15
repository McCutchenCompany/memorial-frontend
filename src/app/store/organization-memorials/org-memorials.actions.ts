import { Action } from '@ngrx/store';
import { Paginator } from '@shared/models/paginator.model';

import { Memorial } from './../../shared/models/memorial.model';

export enum OrgMemActionTypes {
  GET_FIRST_ORG_MEMORIALS = '[Org Mems] Get first org memorials',
  GET_ORG_MEMORIALS = '[Org Mems] Get org memorials',
  GET_ORG_MEMORIALS_SUCCESS = '[Org Mems] Get org memorials success',
  GET_ORG_MEMORIALS_FAILURE = '[Org Mems] Get org memorials failure',
  CREATE_FREE_ORG_MEMORIAL = '[Org Mems] Create free org memorial',
  CREATE_ORG_MEMORIAL_SUCCESS = '[Org Mems] Create org memorial success',
  CREATE_ORG_MEMORIAL_FAILURE = '[Org Mems] Create org memorial failure',
  TOGGLE_ORG_MEMORIAL_PUBLISHED = '[Org Mems] Toggle org memorial published',
  TOGGLE_ORG_MEMORIAL_PUBLISHED_SUCCESS = '[Org Mems] Toggle org memorial published success',
  TOGGLE_ORG_MEMORIAL_PUBLISHED_FAILURE = '[Org Mems] Toggle org memorial published false'
}

export class GetFirstOrgMemorials implements Action {
  readonly type = OrgMemActionTypes.GET_FIRST_ORG_MEMORIALS;
  constructor (public payload: string) {}
}
export class GetOrgMemorials implements Action {
  readonly type = OrgMemActionTypes.GET_ORG_MEMORIALS;
  constructor (public payload: {id: string, paginator: Paginator}) {}
}
export class GetOrgMemorialsSuccess implements Action {
  readonly type = OrgMemActionTypes.GET_ORG_MEMORIALS_SUCCESS;
  constructor (public payload: {results: Memorial[], pagination: Paginator}) {}
}
export class GetOrgMemorialsFailure implements Action {
  readonly type = OrgMemActionTypes.GET_ORG_MEMORIALS_FAILURE;
  constructor (public payload: any) {}
}
export class CreateFreeOrgMemorial implements Action {
  readonly type = OrgMemActionTypes.CREATE_FREE_ORG_MEMORIAL;
  constructor (public payload: string) {}
}
export class CreateOrgMemorialSuccess implements Action {
  readonly type = OrgMemActionTypes.CREATE_ORG_MEMORIAL_SUCCESS;
  constructor (public payload: Memorial) {}
}
export class CreateOrgMemorialFailure implements Action {
  readonly type = OrgMemActionTypes.CREATE_ORG_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export class ToggleOrgMemorialPublished implements Action {
  readonly type = OrgMemActionTypes.TOGGLE_ORG_MEMORIAL_PUBLISHED;
  constructor (public payload: {uuid: string, body: any}) {}
}
export class ToggleOrgMemorialPublishedSuccess implements Action {
  readonly type = OrgMemActionTypes.TOGGLE_ORG_MEMORIAL_PUBLISHED_SUCCESS;
  constructor (public payload: Memorial) {}
}
export class ToggleOrgMemorialPublishedFailure implements Action {
  readonly type = OrgMemActionTypes.TOGGLE_ORG_MEMORIAL_PUBLISHED_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetFirstOrgMemorials
  | GetOrgMemorials
  | GetOrgMemorialsSuccess
  | GetOrgMemorialsFailure
  | CreateFreeOrgMemorial
  | CreateOrgMemorialSuccess
  | CreateOrgMemorialFailure
  | ToggleOrgMemorialPublished
  | ToggleOrgMemorialPublishedSuccess
  | ToggleOrgMemorialPublishedFailure;
