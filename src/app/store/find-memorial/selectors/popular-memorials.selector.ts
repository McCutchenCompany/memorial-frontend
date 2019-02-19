import { createSelector } from '@ngrx/store';

import { adapter, getPopularMemorialState } from '../reducers/popular.reducer';



export const getPopularLoading = createSelector(
  getPopularMemorialState,
  state => state.loading
);
export const getPopularLoaded = createSelector(
  getPopularMemorialState,
  state => state.loaded
);

export const {
  selectIds: getPopularMemorialIds,
  selectEntities: getPopularMemorialEntities,
  selectAll: getAllPopularMemorials,
  selectTotal: getTotalPopularMemorials
} = adapter.getSelectors(getPopularMemorialState);
