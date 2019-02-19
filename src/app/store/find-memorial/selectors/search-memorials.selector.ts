import { createSelector } from '@ngrx/store';

import { adapter } from '../reducers/search-memorials.reducer';
import { getFindMemorialState } from './../reducers';

export const getSearchMemorialState = createSelector(
  getFindMemorialState,
  state => state.searchMemorial
);
export const getSearchQuery = createSelector(
  getSearchMemorialState,
  state => state.query
);
export const getSearchLoading = createSelector(
  getSearchMemorialState,
  state => state.loading
);
export const getSearchLoaded = createSelector(
  getSearchMemorialState,
  state => state.loaded
);
export const getSearchError = createSelector(
  getSearchMemorialState,
  state => state.error
);

export const {
  selectIds: getSearchMemorialIds,
  selectEntities: getSearchMemorialEntities,
  selectAll: getAllSearchMemorials,
  selectTotal: getTotalSearchMemorials
} = adapter.getSelectors(getSearchMemorialState);
