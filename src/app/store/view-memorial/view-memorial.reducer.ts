import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ViewMemorialState } from './../models/view-memorial-state.model';
import { All, ViewMemorialActionTypes } from './view-memorial.actions';


export const INITIAL_STATE: ViewMemorialState = {
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  selectedMemorial: {
    memorial: null,
    location: null,
    timeline: null,
    military: [],
    album: {
      count: 0,
      photos: null
    }
  },
  error: null
};

export function viewMemorialReducer(state: ViewMemorialState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case ViewMemorialActionTypes.JOIN_MEMORIAL:
    case ViewMemorialActionTypes.GET_MEMORIAL: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: INITIAL_STATE.error
      };
    }
    case ViewMemorialActionTypes.GET_MEMORIAL_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        selectedMemorial: action.payload
      };
    }
    case ViewMemorialActionTypes.JOIN_MEMORIAL_FAILURE:
    case ViewMemorialActionTypes.GET_MEMORIAL_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case ViewMemorialActionTypes.EDIT_MEMORY:
    case ViewMemorialActionTypes.DELETE_MEMORY:
    case ViewMemorialActionTypes.ADD_MEMORY: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case ViewMemorialActionTypes.EDIT_MEMORY_SUCCESS:
    case ViewMemorialActionTypes.DELETE_MEMORY_SUCCESS:
    case ViewMemorialActionTypes.ADD_MEMORY_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        selectedMemorial: {
          ...state.selectedMemorial,
          memories: action.payload
        }
      };
    }
    case ViewMemorialActionTypes.EDIT_MEMORY_FAILURE:
    case ViewMemorialActionTypes.DELETE_MEMORY_FAILURE:
    case ViewMemorialActionTypes.ADD_MEMORY_FAILURE: {
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload
      };
    }
    case ViewMemorialActionTypes.ADD_PHOTO_TO_COUNT: {
      return {
        ...state,
        selectedMemorial: {
          ...state.selectedMemorial,
          album: {
            ...state.selectedMemorial.album,
            count: state.selectedMemorial.album.count + 1
          }
        }
      }
    }
    case ViewMemorialActionTypes.REMOVE_PHOTO_FROM_COUNT: {
      return {
        ...state,
        selectedMemorial: {
          ...state.selectedMemorial,
          album: {
            ...state.selectedMemorial.album,
            count: state.selectedMemorial.album.count - 1
          }
        }
      }
    }
    default: {
      return state;
    }
  }
}

export const getViewMemorialState = createFeatureSelector<ViewMemorialState>('viewMemorial');

export const getViewMemorialLoading = createSelector(
  getViewMemorialState,
  state => state.loading
);

export const getViewMemorialLoaded = createSelector(
  getViewMemorialState,
  state => state.loaded
);

export const getViewMemorialError = createSelector(
  getViewMemorialState,
  state => state.error
);

export const getViewMemorial = createSelector(
  getViewMemorialState,
  state => state.selectedMemorial
);

export const getViewSaving = createSelector(
  getViewMemorialState,
  state => state.saving
);

export const getViewSaved = createSelector(
  getViewMemorialState,
  state => state.saved
);

export const getAlbumCount = createSelector(
  getViewMemorial,
  state => state.album.count
);

export const getViewMilitary = createSelector(
  getViewMemorial,
  state => state.military
);
