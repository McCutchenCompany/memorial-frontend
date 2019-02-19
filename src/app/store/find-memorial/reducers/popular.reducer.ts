import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';

import { findMemorialActionTypes } from './../actions/action.types';

export interface PopularMemorialsState extends EntityState<Memorial> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const adapter: EntityAdapter<Memorial> = createEntityAdapter<Memorial>({
  selectId: (memorial: Memorial) => memorial.uuid,
  sortComparer: false
});

export const initialState: PopularMemorialsState = adapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  error: null
});

export function popularMemorialsReducer(state = initialState, action: any): PopularMemorialsState {
  switch (action.type) {
    case findMemorialActionTypes.GET_POPULAR_MEMORIALS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case findMemorialActionTypes.GET_POPULAR_MEMORIALS_SUCCESS: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case findMemorialActionTypes.GET_POPULAR_MEMORIALS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    default: return state;
  }
}

export const getPopularMemorialState = createFeatureSelector<PopularMemorialsState>('popular');
