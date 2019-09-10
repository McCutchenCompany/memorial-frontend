import { createSelector } from '@ngrx/store';

import { getFindMemorialState } from './../reducers';


export const getPositionState = createSelector(
  getFindMemorialState,
  state => {
    if (state && state.userPosition) {
      return state.userPosition.position;
    } else {
      return {
        latitude: 0,
        longitude: 0
      };
    }
  }
);

export const getLatitude = createSelector(
  getPositionState,
  state => state.latitude
);

export const getLongitude = createSelector(
  getPositionState,
  state => state.longitude
);

export const getPermission = createSelector(
  getFindMemorialState,
  state => state.userPosition.permission
);

export const getSetLocation = createSelector(
  getFindMemorialState,
  state => state.userPosition.setLocation
);
