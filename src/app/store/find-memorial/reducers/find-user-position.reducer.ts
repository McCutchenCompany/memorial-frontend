import { FindUserPositionState } from '../../models/find-memorial-state.model';
import { findMemorialActionTypes } from './../actions/action.types';

export const INITIAL_STATE: FindUserPositionState = {
  loading: false,
  loaded: false,
  permission: true,
  setLocation: false,
  position: {
    latitude: 38.876422,
    longitude: -77.073024,
    heading: 0,
    speed: 0,
    timestamp: 0
  }
};

export function findUserPositionReducer(state: FindUserPositionState = INITIAL_STATE, action: any): FindUserPositionState {
  switch (action.type) {
    case findMemorialActionTypes.GET_POSITION: {
      return {
        ...state,
        setLocation: true,
        position: action.payload
      };
    }
    case findMemorialActionTypes.LOCATION_DENIED: {
      return {
        ...state, permission: false
      };
    }
    case findMemorialActionTypes.LOCATION_ACCEPTED: {
      return {
        ...state, permission: true
      };
    }
    default: {
      return state;
    }
  }
}

