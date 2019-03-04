import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Photo } from '@shared/models/photo.model';

import { All, CreatePhotosActionTypes } from '../photos.actions';

export interface NeedApprovalPhotosState extends EntityState<Photo> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const needApprovalPhotoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  selectId: (photo: Photo) => photo.uuid,
  sortComparer: false
});

export const INITIAL_STATE: NeedApprovalPhotosState = needApprovalPhotoAdapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  error: null
});

export function needApprovalPhotoReducer(state = INITIAL_STATE, action: All): NeedApprovalPhotosState {
  switch (action.type) {
    case CreatePhotosActionTypes.GET_CREATE_PHOTOS_SUCCESS: {
      return needApprovalPhotoAdapter.addMany(action.payload.need_approval, {
        ...state
      });
    }
    default: return state;
  }
}
