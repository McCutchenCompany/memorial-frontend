import { createSelector } from '@ngrx/store';

import { getFindMemorialState } from './../reducers';
import { adapter } from './../reducers/memorial-markers.reducer';

export const getMemorialMarkersState = createSelector(
  getFindMemorialState,
  state => state.memorialMarkers
);

export const getMarkersLoading = createSelector(
  getMemorialMarkersState,
  state => state.loading
);
export const getMarkersLoaded = createSelector(
  getMemorialMarkersState,
  state => state.loaded
);
export const getMarkersError = createSelector(
  getMemorialMarkersState,
  state => state.error
);

export const {
  selectIds: getMemorialMarkerIds,
  selectEntities: getMemorialMerkerEntities,
  selectAll: getAllMemorialMarkers,
  selectTotal: getTotalMemrialMarkers
} = adapter.getSelectors(getMemorialMarkersState);

export const getMarkerMemorials = createSelector(
  getAllMemorialMarkers,
  state => state.map(marker => marker.memorial)
);
