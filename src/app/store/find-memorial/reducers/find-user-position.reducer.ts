import { createFeatureSelector } from '@ngrx/store';

import { FindUserPositionState } from '../../models/find-memorial-state.model';
import { All, findMemorialActionTypes as actionTypes } from '../actions/action.types';

export const INITIAL_STATE: FindUserPositionState = {
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

export function findUserPositionReducer(state: FindUserPositionState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case actionTypes.GET_POSITION: {
      return {...state, position: action.payload};
    }
    default: {
      return state;
    }
  }
}

