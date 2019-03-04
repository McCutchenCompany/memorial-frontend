import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Photo } from '@shared/models/photo.model';

import { All, CreatePhotosActionTypes } from '../photos.actions';

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
  sortComparer: false
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
      return allPhotoAdapter.addMany(action.payload.photos, {
        ...state,
        count: action.payload.count,
        loading: false,
        loaded: true
      });
    }
    case CreatePhotosActionTypes.GET_CREATE_PHOTOS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    default: return state;
  }
}
