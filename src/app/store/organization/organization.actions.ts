import { Action } from '@ngrx/store';
import { Organization } from '@shared/models/organization.model';

export enum OrganizationActionTypes {
  CREATE_ORG = '[Organization] Create org',
  CREATE_ORG_SUCCESS = '[Organization] Create org success',
  CREATE_ORG_FAILURE = '[Organization] Create org failure',
  GET_ORG = '[Organization] Get org',
  GET_ORG_SUCCESS = '[Organization] Get org success',
  GET_ORG_FAILURE = '[Organization] Get org failure',
  UPLOAD_ORG_IMAGE = '[Organization] Upload org image',
  UPDATE_ORG = '[Organization] Update org',
  UPDATE_ORG_SUCCESS = '[Organization] Update org success',
  UPDATE_ORG_FAILURE = '[Organization] Update org failure',
  UPLOAD_ORG_IMAGE_SUCCESS = '[Organization] Upload org image success',
  UPLOAD_ORG_IMAGE_FAILURE = '[Organization] Upload org image failure',
  REPLACE_ORG_IMAGE = '[Organization] Replace org image',
  REPLACE_ORG_IMAGE_SUCCESS = '[Organization] Replace org image success',
  REPLACE_ORG_IMAGE_FAILURE = '[Organization] Replace org image failure',
  REMOVE_ORG_IMAGE = '[Organization] Remove org image',
  REMOVE_ORG_IMAGE_SUCCESS = '[Organization] Remove org image success',
  REMOVE_ORG_IMAGE_FAILURE = '[Organization] Remove org image failure'
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

export class UpdateOrg implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORG;
  constructor(public payload: {id: string, body: any}) {}
}
export class UpdateOrgSuccess implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORG_SUCCESS;
  constructor (public payload: Organization) {}
}
export class UpdateOrgFailure implements Action {
  readonly type = OrganizationActionTypes.UPDATE_ORG_FAILURE;
  constructor (public payload: any) {}
}

export class UploadOrgImage implements Action {
  readonly type = OrganizationActionTypes.UPLOAD_ORG_IMAGE;
  constructor (public payload: any) {}
}
export class UploadOrgImageSuccess implements Action {
  readonly type = OrganizationActionTypes.UPLOAD_ORG_IMAGE_SUCCESS;
  constructor (public payload: Organization) {}
}
export class UploadOrgImageFailure implements Action {
  readonly type = OrganizationActionTypes.UPLOAD_ORG_IMAGE_FAILURE;
  constructor (public payload: any) {}
}

export class ReplaceOrgImage implements Action {
  readonly type = OrganizationActionTypes.REPLACE_ORG_IMAGE;
  constructor (public payload: any) {}
}
export class ReplaceOrgImageSuccess implements Action {
  readonly type = OrganizationActionTypes.REPLACE_ORG_IMAGE_SUCCESS;
  constructor (public payload: Organization) {}
}
export class ReplaceOrgImageFailure implements Action {
  readonly type = OrganizationActionTypes.REPLACE_ORG_IMAGE_FAILURE;
  constructor (public payload: any) {}
}

export class RemoveOrgImage implements Action {
  readonly type = OrganizationActionTypes.REMOVE_ORG_IMAGE;
  constructor (public payload: any) {}
}
export class RemoveOrgImageSuccess implements Action {
  readonly type = OrganizationActionTypes.REMOVE_ORG_IMAGE_SUCCESS;
  constructor (public payload: any) {}
}
export class RemoveOrgImageFailure implements Action {
  readonly type = OrganizationActionTypes.REMOVE_ORG_IMAGE_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | CreateOrg
  | CreateOrgSuccess
  | CreateOrgFailure
  | GetOrg
  | GetOrgSuccess
  | GetOrgFailure
  | UploadOrgImage
  | UploadOrgImageSuccess
  | UploadOrgImageFailure
  | ReplaceOrgImage
  | ReplaceOrgImageSuccess
  | ReplaceOrgImageFailure
  | RemoveOrgImage
  | RemoveOrgImageSuccess
  | RemoveOrgImageFailure
  | UpdateOrg
  | UpdateOrgSuccess
  | UpdateOrgFailure;
