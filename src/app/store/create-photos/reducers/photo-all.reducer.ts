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
  }
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
    case CreatePhotosActionTypes.UPLODA_CREATE_PHOTO_FAILURE: {
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
