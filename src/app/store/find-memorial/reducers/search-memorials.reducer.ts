import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { findMemorialActionTypes } from '../actions/action.types';
import { Memorial } from './../../../shared/models/memorial.model';

export interface SearchMemorialsState extends EntityState<Memorial> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  error: any;
  query: string;
}

export const adapter: EntityAdapter<Memorial> = createEntityAdapter<Memorial>({
  selectId: (memorial: Memorial) => memorial.uuid,
  sortComparer: false
});

export const initialState: SearchMemorialsState = adapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  error: null,
  query: null
});

export function searchMemorialsReducer(state = initialState, action: any): SearchMemorialsState {
  switch (action.type) {
    case findMemorialActionTypes.SEARCH_MEMORIALS: {
      return adapter.removeAll({
        ...state,
        loading: true,
        loaded: false,
        query: action.payload
      });
    }
    case findMemorialActionTypes.SEARCH_MEMORIALS_SUCCESS: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case findMemorialActionTypes.SEARCH_MEMORIALS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case findMemorialActionTypes.CLEAR_SEARCH_MEMORIALS: {
      return adapter.removeAll({
        ...state,
        query: initialState.query
      });
    }
    default: {
      return {...state};
    }
  }
}
