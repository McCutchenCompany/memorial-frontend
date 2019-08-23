import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MilitaryHistory } from '@shared/models/military.model';

import { All, MilitaryHistoryActionTypes } from './military-history.actions';

export interface MilitaryHistoryState extends EntityState<any> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  error: any;
}

export const militaryHistoryAdapter: EntityAdapter<MilitaryHistory> = createEntityAdapter<MilitaryHistory>({
  selectId: (history: MilitaryHistory) => history.military_branch.uuid,
  sortComparer: false
});

export const INITIAL_STATE: MilitaryHistoryState = militaryHistoryAdapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null
});

export function militaryHistoryReducer(state = INITIAL_STATE, action: All): MilitaryHistoryState {
  switch (action.type) {
    case MilitaryHistoryActionTypes.GET_MILITARY_HISTORY: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case MilitaryHistoryActionTypes.GET_MILITARY_HISTORY_SUCCESS: {
      return militaryHistoryAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case MilitaryHistoryActionTypes.GET_MILITARY_HISTORY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case MilitaryHistoryActionTypes.REMOVE_MEDAL:
    case MilitaryHistoryActionTypes.ADD_MEDAL:
    case MilitaryHistoryActionTypes.ADD_MILITARY_BRANCH:
    case MilitaryHistoryActionTypes.REMOVE_MILITARY_BRANCH: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case MilitaryHistoryActionTypes.REMOVE_MEDAL_SUCCESS:
    case MilitaryHistoryActionTypes.ADD_MEDAL_SUCCESS:
    case MilitaryHistoryActionTypes.ADD_MILITARY_BRANCH_SUCCESS:
    case MilitaryHistoryActionTypes.REMOVE_MILITARY_BRANCH_SUCCESS: {
      return militaryHistoryAdapter.addAll(action.payload, {
        ...state,
        saving: false,
        saved: true
      });
    }
    case MilitaryHistoryActionTypes.REMOVE_MEDAL_FAILURE:
    case MilitaryHistoryActionTypes.ADD_MEDAL_FAILURE:
    case MilitaryHistoryActionTypes.ADD_MILITARY_BRANCH_FAILURE:
    case MilitaryHistoryActionTypes.REMOVE_MILITARY_BRANCH_FAILURE: {
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload
      };
    }
    default: return state;
  }
}

export const getMilitaryHistoryState = createFeatureSelector<MilitaryHistoryState>('militaryHistory');

export const getMilitaryHistoryLoading = createSelector(
  getMilitaryHistoryState,
  state => state.loading
);
export const getMilitaryHistoryLoaded = createSelector(
  getMilitaryHistoryState,
  state => state.loaded
);
export const getMilitaryHistorySaving = createSelector(
  getMilitaryHistoryState,
  state => state.saving
);
export const getMilitaryHistorySaved = createSelector(
  getMilitaryHistoryState,
  state => state.saved
);
export const getMilitaryHistoryError = createSelector(
  getMilitaryHistoryState,
  state => state.error
);

export const {
  selectIds: getMilitaryHistoryIds,
  selectAll: getAllMilitaryHistory,
  selectEntities: getMilitaryHistoryEntities,
  selectTotal: getMilitaryHistoryTotal
} = militaryHistoryAdapter.getSelectors(getMilitaryHistoryState);
