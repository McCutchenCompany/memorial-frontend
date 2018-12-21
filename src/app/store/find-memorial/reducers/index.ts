import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { FindUserPositionState } from '../../models/find-memorial-state.model';
import { findUserPositionReducer } from './find-user-position.reducer';
import { memorialMarkerReducer, MemorialMarkersState } from './memorial-markers.reducer';

export interface FindMemorialState {
  memorialMarkers: MemorialMarkersState;
  userPosition: FindUserPositionState;
}

export const findMemorialReducer: ActionReducerMap<FindMemorialState> = {
  memorialMarkers: memorialMarkerReducer,
  userPosition: findUserPositionReducer
};

export const getFindMemorialState = createFeatureSelector<FindMemorialState>('find-memorial');
