import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { LocationMarker } from '../../../shared/models/location-marker.model';
import { findMemorialActionTypes } from '../actions/action.types';

export interface MemorialMarkersState extends EntityState<LocationMarker> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<LocationMarker> = createEntityAdapter<LocationMarker>({
  selectId: (marker: LocationMarker) => marker.uuid,
  sortComparer: false
});

export const initialState: MemorialMarkersState = adapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  error: null
});

export function memorialMarkerReducer(state = initialState, action: any): MemorialMarkersState {
  switch (action.type) {
    case findMemorialActionTypes.GET_IN_RANGE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case findMemorialActionTypes.GET_IN_RANGE_SUCCESS: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case findMemorialActionTypes.GET_IN_RANGE_FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }
    default: {
      return {...state};
    }
  }
}
