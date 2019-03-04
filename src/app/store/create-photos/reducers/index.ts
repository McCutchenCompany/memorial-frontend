import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { allPhotoAdapter, allPhotoReducer, CreateAllPhotosState } from './photo-all.reducer';
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

export const getCreatePhotoState = createFeatureSelector<CreatePhotoState>('createPhotos');

export const getCreateAllPhotosState = createSelector(
  getCreatePhotoState,
  state => state.allPhotos
);
export const getCreatePhotosCount = createSelector(
  getCreateAllPhotosState,
  state => state.count
);
export const getCreateAllPhotoTotal = createSelector(
  getCreatePhotosCount,
  state => {
    const approved = state.approved;
    const denied = state.denied;
    const needApproval = state.need_approval;
    return approved + denied + needApproval;
  }
);

export const {
  selectIds: getCreateAllPhotoIds,
  selectAll: getAllCreatePhotos,
  selectTotal: getCreateAllPhotosTotal
} = allPhotoAdapter.getSelectors(getCreateAllPhotosState);

