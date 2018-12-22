import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CreateMemorialState } from '../models/create-memorial-state.model';
import { All, CreateMemorialActionTypes } from './create-memorial.actions';

export const INITIAL_STATE: CreateMemorialState = {
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  memorial: null,
  error: null
};

export function createMemorialReducer(state: CreateMemorialState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case CreateMemorialActionTypes.GET_CREATE_MEMORIAL: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case CreateMemorialActionTypes.GET_CREATE_MEMORIAL_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        memorial: action.payload
      };
    }
    case CreateMemorialActionTypes.GET_CREATE_MEMORIAL_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE:
    case CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE:
    case CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE:
    case CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE_SUCCESS:
    case CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE_SUCCESS:
    case CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE_SUCCESS:
    case CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        memorial: {
          ...state.memorial,
          memorial: action.payload
        }
      };
    }
    case CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE_FAILURE:
    case CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE_FAILURE:
    case CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE_FAILURE:
    case CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL_FAILURE: {
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getCreateMemorialState = createFeatureSelector<CreateMemorialState>('createMemorial');

export const getCreateMemorial = createSelector(
  getCreateMemorialState,
  state => state.memorial
);
export const getCreateLoading = createSelector(
  getCreateMemorialState,
  state => state.loading
);
export const getCreateLoaded = createSelector(
  getCreateMemorialState,
  state => state.loaded
);
export const getCreatedSaving = createSelector(
  getCreateMemorialState,
  state => state.saving
);
export const getCreatedSaved = createSelector(
  getCreateMemorialState,
  state => state.saved
);
