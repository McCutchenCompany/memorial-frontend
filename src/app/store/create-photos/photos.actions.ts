import { Action } from '@ngrx/store';
import { Photo } from '@shared/models/photo.model';

export enum CreatePhotosActionTypes {
  GET_CREATE_PHOTOS = '[Create Photos] Get create photos',
  GET_CREATE_PHOTOS_SUCCESS = '[Create Photos] Get create photos success',
  GET_CREATE_PHOTOS_FAILURE = '[Create Photos] Get create photos failure',
  GET_MORE_PHOTOS = '[Create Photos] Get more photos',
  GET_MORE_PHOTOS_SUCCESS = '[Create Photos] Get more photos success',
  GET_MORE_PHOTOS_FAILURE = '[Create Photos] Get more photos failure',
  UPLOAD_CREATE_PHOTO = '[Create Photos] Upload create photo',
  UPLOAD_CREATE_PHOTO_SUCCESS = '[Create Photos] Upload create photo success',
  UPLOAD_CREATE_PHOTO_FAILURE = '[Create Photos] Upload create photo failure',
  UPDATE_CREATE_PHOTO = '[Create Photos] Update create photo',
  UPDATE_CREATE_ALL_PHOTO_SUCCESS = '[Create Photos] Update create all photo success',
  UPDATE_CREATE_NEED_APPROVAL_PHOTO_SUCCESS = '[Create Photos] Update create need approval photo success',
  UPDATE_CREATE_APPROVED_PHOTO_SUCCESS = '[Create Photos] Update create approved photo success',
  UPDATE_CREATE_DENIED_PHOTO_SUCCESS = '[Create Photos] Update create denied photo success',
  UPDATE_CREATE_PHOTO_FAILURE = '[Create Photos] Update create photo failure',
  APPROVE_PHOTO = '[Create Photos] Approve photo',
  APPROVE_DENIED_PHOTO_SUCCESS = '[Create Photos] Approve denied photo success',
  APPROVE_NEED_APPROVAL_PHOTO_SUCCESS = '[Create Photos] Approve need approval success',
  APPROVE_PHOTO_FAILURE = '[Create Photos] Approve photo failure',
  DENY_PHOTO = '[Create Photos] Deny photo',
  DENY_PHOTO_FAILURE = '[Create Photos] Deny photo failure',
  DENY_NEED_APPROVAL_PHOTO_SUCCESS = '[Create Photos] Deny need approval photo success',
  DENY_APPROVED_PHOTO_SUCCESS = '[Create Photos] Deny approved photo success'
}

export class GetCreatePhotos implements Action {
  readonly type = CreatePhotosActionTypes.GET_CREATE_PHOTOS;
  constructor (public payload: any) {}
}
export class GetCreatePhotosSuccess implements Action {
  readonly type = CreatePhotosActionTypes.GET_CREATE_PHOTOS_SUCCESS;
  constructor (public payload: any) {}
}
export class GetCreatePhotosFailure implements Action {
  readonly type = CreatePhotosActionTypes.GET_CREATE_PHOTOS_FAILURE;
  constructor (public payload: any) {}
}

export class GetMorePhotos implements Action {
  readonly type = CreatePhotosActionTypes.GET_MORE_PHOTOS;
  constructor (public payload: any) {}
}
export class GetMorePhotosSuccess implements Action {
  readonly type = CreatePhotosActionTypes.GET_MORE_PHOTOS_SUCCESS;
  constructor (public payload: any) {}
}
export class GetMorePhotosFailure implements Action {
  readonly type = CreatePhotosActionTypes.GET_MORE_PHOTOS_FAILURE;
  constructor (public payload: any) {}
}

export class UploadCreatePhoto implements Action {
  readonly type = CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO;
  constructor (public payload: any) {}
}
export class UploadCreatePhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO_SUCCESS;
  constructor (public payload: any) {}
}
export class UploadCreatePhotoFailure implements Action {
  readonly type = CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateCreatePhoto implements Action {
  readonly type = CreatePhotosActionTypes.UPDATE_CREATE_PHOTO;
  constructor (public payload: {photo_id: string, body: {title?: string, description?: string}}) {}
}
export class UpdateCreateAllPhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.UPDATE_CREATE_ALL_PHOTO_SUCCESS;
  constructor (public payload: Photo) {}
}
export class UpdateCreateNeedApprovalPhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.UPDATE_CREATE_NEED_APPROVAL_PHOTO_SUCCESS;
  constructor (public payload: Photo) {}
}
export class UpdateCreateDeniedPhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.UPDATE_CREATE_DENIED_PHOTO_SUCCESS;
  constructor (public payload: Photo) {}
}
export class UpdateCreateApprovedPhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.UPDATE_CREATE_APPROVED_PHOTO_SUCCESS;
  constructor (public payload: Photo) {}
}
export class UpdateCreatePhotoFailure implements Action {
  readonly type = CreatePhotosActionTypes.UPDATE_CREATE_PHOTO_FAILURE;
  constructor (public payload: any) {}
}

export class ApprovePhoto implements Action {
  readonly type = CreatePhotosActionTypes.APPROVE_PHOTO;
  constructor (public payload: {photo_id: string, memorial_id: string}) {}
}
export class ApproveNeedApprovalPhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.APPROVE_NEED_APPROVAL_PHOTO_SUCCESS;
  constructor (public payload: {count: any, photo: Photo}) {}
}
export class ApproveDeniedPhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.APPROVE_DENIED_PHOTO_SUCCESS;
  constructor (public payload: {count: any, photo: Photo}) {}
}
export class ApprovePhotoFailure implements Action {
  readonly type = CreatePhotosActionTypes.APPROVE_PHOTO_FAILURE;
  constructor (public payload: any) {}
}

export class DenyPhoto implements Action {
  readonly type = CreatePhotosActionTypes.DENY_PHOTO;
  constructor (public payload: {photo_id: string, memorial_id: string}) {}
}
export class DenyPhotoFailure implements Action {
  readonly type = CreatePhotosActionTypes.DENY_PHOTO_FAILURE;
  constructor (public payload: any) {}
}
export class DenyApprovedPhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.DENY_APPROVED_PHOTO_SUCCESS;
  constructor (public payload: {count: any, photo: Photo}) {}
}
export class DenyNeedApprovalPhotoSuccess implements Action {
  readonly type = CreatePhotosActionTypes.DENY_NEED_APPROVAL_PHOTO_SUCCESS;
  constructor (public payload: {count: any, photo: Photo}) {}
}

export type All =
  | GetCreatePhotos
  | GetCreatePhotosSuccess
  | GetCreatePhotosFailure
  | GetMorePhotos
  | GetMorePhotosSuccess
  | GetMorePhotosFailure
  | UploadCreatePhoto
  | UploadCreatePhotoSuccess
  | UploadCreatePhotoFailure
  | UpdateCreatePhoto
  | UpdateCreateAllPhotoSuccess
  | UpdateCreateApprovedPhotoSuccess
  | UpdateCreateDeniedPhotoSuccess
  | UpdateCreateNeedApprovalPhotoSuccess
  | UpdateCreatePhotoFailure
  | ApprovePhoto
  | ApproveDeniedPhotoSuccess
  | ApproveNeedApprovalPhotoSuccess
  | ApprovePhotoFailure
  | DenyPhoto
  | DenyPhotoFailure
  | DenyApprovedPhotoSuccess
  | DenyNeedApprovalPhotoSuccess;
