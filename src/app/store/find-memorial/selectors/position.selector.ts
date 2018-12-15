import { createSelector } from '@ngrx/store';

import { getFindMemorialState } from './../reducers';


export const getPositionState = createSelector(
  getFindMemorialState,
  state => state.userPosition.position
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
