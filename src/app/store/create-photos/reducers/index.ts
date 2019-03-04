import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { allPhotoReducer, CreateAllPhotosState } from './photo-all.reducer';
import { approvedPhotoReducer, ApprovedPhotosState } from './photo-approved.reducer';
import { deniedPhotoReducer, DeniedPhotosState } from './photo-denied.reducer';
import { needApprovalPhotoReducer, NeedApprovalPhotosState } from './photo-need-approval.reducer';

export interface CreatePhotoState {
  allPhotos: CreateAllPhotosState;
  approved: ApprovedPhotosState;
  denied: DeniedPhotosState;
  needApproval: NeedApprovalPhotosState;
}

export const createPhotoReducer: ActionReducerMap<CreatePhotoState> = {
  allPhotos: allPhotoReducer,
  approved: approvedPhotoReducer,
  denied: deniedPhotoReducer,
  needApproval: needApprovalPhotoReducer
};

export const getCreatePhotoState = createFeatureSelector<CreatePhotoState>('create-photos');
