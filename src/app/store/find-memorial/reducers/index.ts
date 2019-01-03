import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { FindUserPositionState } from '../../models/find-memorial-state.model';
import { findUserPositionReducer } from './find-user-position.reducer';
import { memorialMarkerReducer, MemorialMarkersState } from './memorial-markers.reducer';
import { searchMemorialsReducer, SearchMemorialsState } from './search-memorials.reducer';

export interface FindMemorialState {
  memorialMarkers: MemorialMarkersState;
  userPosition: FindUserPositionState;
  searchMemorial: SearchMemorialsState;
}

export const findMemorialReducer: ActionReducerMap<FindMemorialState> = {
  memorialMarkers: memorialMarkerReducer,
  userPosition: findUserPositionReducer,
  searchMemorial: searchMemorialsReducer
};

export const getFindMemorialState = createFeatureSelector<FindMemorialState>('find-memorial');
