import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Photo } from '@shared/models/photo.model';

import { All, CreatePhotosActionTypes } from '../photos.actions';

function sortByDate(p1, p2) {
  const p1Date = new Date(p1.created_at);
  const p2Date = new Date(p2.created_at);
  if (p1Date > p2Date) {
    return -1;
  } else {
    return 1;
  }
}

export interface NeedApprovalPhotosState extends EntityState<Photo> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const needApprovalPhotoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  selectId: (photo: Photo) => photo.uuid,
  sortComparer: sortByDate
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
      if (action.payload.need_approval) {
        return needApprovalPhotoAdapter.addAll(action.payload.need_approval, {
          ...state
        });
      } else {
        return state;
      }
    }
    case CreatePhotosActionTypes.UPDATE_CREATE_NEED_APPROVAL_PHOTO_SUCCESS: {
      return needApprovalPhotoAdapter.updateOne({id: action.payload.uuid, changes: action.payload}, state);
    }
    case CreatePhotosActionTypes.APPROVE_NEED_APPROVAL_PHOTO_SUCCESS: {
      return needApprovalPhotoAdapter.removeOne(action.payload.uuid, state);
    }
    case CreatePhotosActionTypes.DENY_NEED_APPROVAL_PHOTO_SUCCESS: {
      return needApprovalPhotoAdapter.removeOne(action.payload.uuid, state);
    }
    default: return state;
  }
}
