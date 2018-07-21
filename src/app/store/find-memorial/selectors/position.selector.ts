import { createSelector } from '@ngrx/store';

import { getFindMemorialState } from './../find-memorial.reducer';

export const getPositionState = createSelector(
  getFindMemorialState,
  state => state.position
);

export const getLatitude = createSelector(
  getPositionState,
  state => state.latitude
);

export const getLongitude = createSelector(
  getPositionState,
  state => state.longitude
);
