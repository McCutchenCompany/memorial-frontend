import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Paginator } from '@shared/models/paginator.model';

import { All, OrgMemActionTypes } from './org-memorials.actions';

export interface OrgMemorialState extends EntityState<any> {
  ids: string[];
  paginator: Paginator;
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  error: any;
}

export const orgMemAdapter: EntityAdapter<Memorial> = createEntityAdapter<Memorial>({
  selectId: (memorial: Memorial) => memorial.uuid,
  sortComparer: false
});

export const INITIAL_STATE: OrgMemorialState = orgMemAdapter.getInitialState({
  ids: [],
  paginator: {
    q: '',
    p: '1',
    per_p: '20',
    o_column: 'created_at',
    o_direction: 'desc',
    total: 0
  },
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null
});

export function orgMemorialReducer(state = INITIAL_STATE, action: All): OrgMemorialState {
  switch (action.type) {
    case OrgMemActionTypes.GET_FIRST_ORG_MEMORIALS: {
      return orgMemAdapter.removeAll({
        ...state,
        loading: true,
        loaded: false,
        paginator: INITIAL_STATE.paginator
      });
    }
    case OrgMemActionTypes.GET_ORG_MEMORIALS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case OrgMemActionTypes.GET_ORG_MEMORIALS_SUCCESS: {
      return orgMemAdapter.addAll(action.payload.results, {
        ...state,
        loading: false,
        loaded: true,
        paginator: {
          ...state.paginator,
          q: action.payload.pagination.q,
          p: action.payload.pagination.p,
          per_p: action.payload.pagination.per_p,
          total: action.payload.pagination.total,
          o_column: action.payload.pagination.order.column,
          o_direction: action.payload.pagination.order.dir
        }
      });
    }
    case OrgMemActionTypes.GET_ORG_MEMORIALS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case OrgMemActionTypes.CREATE_FREE_ORG_MEMORIAL: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case OrgMemActionTypes.CREATE_ORG_MEMORIAL_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true
      };
    }
    case OrgMemActionTypes.CREATE_ORG_MEMORIAL_FAILURE: {
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

export const getOrgMemorialsState = createFeatureSelector<OrgMemorialState>('org-memorials');

export const {
  selectIds: getOrgMemorialsIds,
  selectAll: getAllOrgMemorials,
  selectEntities: getOrgMemorialsEntities,
  selectTotal: getOrgMemorialsTotal
} = orgMemAdapter.getSelectors(getOrgMemorialsState);

export const getOrgMemorialsPaginator = createSelector(
  getOrgMemorialsState,
  state => state.paginator
);

export const getOrgMemorialsLoading = createSelector(
  getOrgMemorialsState,
  state => state.loading
);
export const getOrgMemorialsLoaded = createSelector(
  getOrgMemorialsState,
  state => state.loaded
);

export const getOrgMemorialsSaving = createSelector(
  getOrgMemorialsState,
  state => state.saving
);
export const getOrgMemorialsSaved = createSelector(
  getOrgMemorialsState,
  state => state.saved
);
