import { createFeatureSelector } from '@ngrx/store';

import { FindMemorialState } from '../models/find-memorial-state.model';
import { findMemorialActionTypes as actionTypes } from './actions/action.types';

export const INITIAL_STATE: FindMemorialState = {
  loading: false,
  loaded: false,
  position: {
    latitude: 0,
    longitude: 0,
    heading: 0,
    speed: 0,
    timestamp: 0
  }
};

export function findMemorialReducer(state: FindMemorialState = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_POSITION: {
      return {...state, position: action.payload};
    }
    default: {
      return state;
    }
  }
}

export const getFindMemorialState = createFeatureSelector<FindMemorialState>('findMemorial');
