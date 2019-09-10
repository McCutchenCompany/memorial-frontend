import { createSelector } from '@ngrx/store';

import { getFindMemorialState } from './../reducers';
import { adapter } from './../reducers/memorial-markers.reducer';
import { getLatitude, getLongitude } from './position.selector';

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
  getLatitude,
  getLongitude,
  (state, lat, long) => {
    const markers = sortMarkers(state, {lat, long});
    return markers.map(marker => {
      return {...marker.memorial, military: marker.military};
    });
  }
);

function sortMarkers(markers: any[], pos): any[] {
  return markers.sort((a, b) => {
    const aLen = Math.sqrt(Math.pow((a.latitude - pos.lat), 2) + Math.pow((a.longitude - pos.long), 2));
    const bLen = Math.sqrt(Math.pow((b.latitude - pos.lat), 2) + Math.pow((b.longitude - pos.long), 2));
    if (aLen > bLen) {
      return 1;
    } else {
      return -1;
    }
  });
}
