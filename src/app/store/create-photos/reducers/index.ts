import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { allPhotoAdapter, allPhotoReducer, CreateAllPhotosState } from './photo-all.reducer';
import { approvedPhotoReducer, ApprovedPhotosState } from './photo-approved.reducer';
import { deniedPhotoAdapter, deniedPhotoReducer, DeniedPhotosState } from './photo-denied.reducer';
import { needApprovalPhotoAdapter, needApprovalPhotoReducer, NeedApprovalPhotosState } from './photo-need-approval.reducer';

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
export const getCreateNeedApprovalPhotosState = createSelector(
  getCreatePhotoState,
  state => state.needApproval
);
export const getCreateDeniedPhotosState = createSelector(
  getCreatePhotoState,
  state => state.denied
);
export const getCreateApprovedPhotosState = createSelector(
  getCreatePhotoState,
  state => state.approved
)
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

export const getCreatePhotosSaving = createSelector(
  getCreateAllPhotosState,
  state => state.saving
);
export const getCreatePhotosSaved = createSelector(
  getCreateAllPhotosState,
  state => state.saved
);

export const {
  selectIds: getCreateAllPhotoIds,
  selectAll: getAllCreatePhotos,
  selectTotal: getCreateAllPhotosTotal
} = allPhotoAdapter.getSelectors(getCreateAllPhotosState);

export const {
  selectAll: getAllNeedApprovalPhotos,
  selectTotal: getNeedApprovalPhotosTotal
} = needApprovalPhotoAdapter.getSelectors(getCreateNeedApprovalPhotosState);

export const {
  selectAll: getAllDeniedPhotos,
  selectTotal: getDeniedPhotosTotal
} = deniedPhotoAdapter.getSelectors(getCreateDeniedPhotosState);

export const {
  selectAll: getAllApprovedPhotos,
  selectTotal: getApprovedPhotosTotal
} = deniedPhotoAdapter.getSelectors(getCreateApprovedPhotosState);
