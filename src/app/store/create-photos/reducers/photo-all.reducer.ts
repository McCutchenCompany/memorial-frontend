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

export interface CreateAllPhotosState extends EntityState<any> {
  ids: string[];
  count: {
    approved: number;
    denied: number;
    need_approval: number;
  };
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  error: any;
}

export const allPhotoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  selectId: (photo: Photo) => photo.uuid,
  sortComparer: sortByDate
});

export const INITIAL_STATE: CreateAllPhotosState = allPhotoAdapter.getInitialState({
  ids: [],
  count: {
    approved: 0,
    denied: 0,
    need_approval: 0
  },
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null
});

export function allPhotoReducer(state = INITIAL_STATE, action: All): CreateAllPhotosState {
  switch (action.type) {
    case CreatePhotosActionTypes.GET_CREATE_PHOTOS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case CreatePhotosActionTypes.GET_CREATE_PHOTOS_SUCCESS: {
      if (action.payload.photos) {
        return allPhotoAdapter.addAll(action.payload.photos, {
          ...state,
          count: action.payload.count,
          loading: false,
          loaded: true
        });
      } else {
        return {
          ...state,
          count: action.payload.count,
          loading: false,
          loaded: true
        };
      }
    }
    case CreatePhotosActionTypes.GET_CREATE_PHOTOS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case CreatePhotosActionTypes.DENY_PHOTO:
    case CreatePhotosActionTypes.APPROVE_PHOTO:
    case CreatePhotosActionTypes.UPDATE_CREATE_PHOTO:
    case CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO_SUCCESS: {
      return allPhotoAdapter.addOne(action.payload, {
        ...state,
        saving: false,
        saved: true,
        count: {
          ...state.count,
          approved: state.count.approved + 1
        }
      });
    }
    case CreatePhotosActionTypes.UPDATE_CREATE_ALL_PHOTO_SUCCESS: {
      return allPhotoAdapter.updateOne({id: action.payload.uuid, changes: action.payload}, {
        ...state,
        saving: false,
        saved: true
      });
    }
    case CreatePhotosActionTypes.APPROVE_DENIED_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.APPROVE_NEED_APPROVAL_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.DENY_APPROVED_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.DENY_NEED_APPROVAL_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.UPDATE_CREATE_DENIED_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.UPDATE_CREATE_NEED_APPROVAL_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.UPDATE_CREATE_APPROVED_PHOTO_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true
      };
    }
    case CreatePhotosActionTypes.DENY_PHOTO_FAILURE:
    case CreatePhotosActionTypes.APPROVE_PHOTO_FAILURE:
    case CreatePhotosActionTypes.UPDATE_CREATE_PHOTO_FAILURE:
    case CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO_FAILURE: {
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
