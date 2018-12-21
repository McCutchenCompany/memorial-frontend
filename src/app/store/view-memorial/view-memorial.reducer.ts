import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ViewMemorialState } from './../models/view-memorial-state.model';
import { All, ViewMemorialActionTypes } from './view-memorial.actions';


export const INITIAL_STATE: ViewMemorialState = {
  loading: false,
  loaded: false,
  selectedMemorial: {
    memorial: null,
    location: null,
    timeline: null
  },
  error: null
};

export function viewMemorialReducer(state: ViewMemorialState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case ViewMemorialActionTypes.GET_MEMORIAL: {
      return {
        ...state,
        loading: true,
        loaded: false
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
    case ViewMemorialActionTypes.GET_MEMORIAL_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
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
