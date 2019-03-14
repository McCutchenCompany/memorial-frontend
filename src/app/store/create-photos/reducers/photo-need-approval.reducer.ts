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
  saving: boolean;
  saved: boolean;
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
  saving: false,
  saved: false,
  error: null
});

export function needApprovalPhotoReducer(state = INITIAL_STATE, action: All): NeedApprovalPhotosState {
  switch (action.type) {
    case CreatePhotosActionTypes.GET_MORE_PHOTOS: {
      if (action.payload.waiting) {
        return {
          ...state,
          loading: true,
          loaded: false
        };
      } else {
        return state;
      }
    }
    case CreatePhotosActionTypes.GET_CREATE_PHOTOS_SUCCESS: {
      if (action.payload.need_approval) {
        return needApprovalPhotoAdapter.addAll(action.payload.need_approval, {
          ...state,
          loading: false,
          loaded: true
        });
      } else {
        return state;
      }
    }
    case CreatePhotosActionTypes.GET_MORE_PHOTOS_SUCCESS: {
      if (action.payload.need_approval) {
        return needApprovalPhotoAdapter.addMany(action.payload.need_approval, {
          ...state,
          loading: false,
          loaded: true
        });
      } else {
        return state;
      }
    }
    case CreatePhotosActionTypes.UPDATE_CREATE_NEED_APPROVAL_PHOTO_SUCCESS: {
      return needApprovalPhotoAdapter.updateOne({id: action.payload.uuid, changes: action.payload}, state);
    }
    case CreatePhotosActionTypes.APPROVE_NEED_APPROVAL_PHOTO_SUCCESS: {
      return needApprovalPhotoAdapter.removeOne(action.payload.photo.uuid, state);
    }
    case CreatePhotosActionTypes.DENY_NEED_APPROVAL_PHOTO_SUCCESS: {
      return needApprovalPhotoAdapter.removeOne(action.payload.photo.uuid, state);
    }
    case CreatePhotosActionTypes.DELETE_NEED_APPROVAL_PHOTO: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case CreatePhotosActionTypes.DELETE_NEED_APPROVAL_PHOTO_SUCCESS: {
      return needApprovalPhotoAdapter.removeOne(action.payload.id, {
        ...state,
        saving: false,
        saved: true
      });
    }
    case CreatePhotosActionTypes.DELETE_NEED_APPROVAL_PHOTO_FAILURE: {
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload
      };
    }
    default: return state;
  }
}
