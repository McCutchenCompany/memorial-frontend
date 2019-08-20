import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Paginator } from '@shared/models/paginator.model';
import { User } from '@shared/models/user.model';

import { All, MemorialMemberActionTypes } from './memorial-members.actions';

export interface MemorialMemberState extends EntityState<any> {
  ids: string[];
  paginator: Paginator;
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  error: any;
  org: any;
}

export const memorialMemberAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.uuid,
  sortComparer: false
});

export const INITIAL_STATE: MemorialMemberState = memorialMemberAdapter.getInitialState({
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
  error: null,
  org: null
});

export function MemorialMemberReducer(state = INITIAL_STATE, action: All): MemorialMemberState {
  switch (action.type) {
    case MemorialMemberActionTypes.GET_FIRST_MEMORIAL_MEMBERS: {
      return memorialMemberAdapter.removeAll({
        ...state,
        loading: true,
        loaded: false,
        paginator: INITIAL_STATE.paginator
      });
    }
    case MemorialMemberActionTypes.GET_MEMORIAL_MEMBERS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case MemorialMemberActionTypes.GET_MEMORIAL_MEMBERS_SUCCESS: {
      return memorialMemberAdapter.addAll(action.payload.results, {
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
        },
        org: action.payload.organization
      });
    }
    case MemorialMemberActionTypes.GET_MEMORIAL_MEMBERS_FAILURE: {
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


export const getMemorialMembersState = createFeatureSelector<MemorialMemberState>('memorial-members');

export const {
  selectIds: getMemorialMembersIds,
  selectAll: getAllMemorialMembers,
  selectEntities: getMemorialMembersEntities,
  selectTotal: getMemorialMembersTotal
} = memorialMemberAdapter.getSelectors(getMemorialMembersState);

export const getMemorialMembersPaginator = createSelector(
  getMemorialMembersState,
  state => state.paginator
);

export const getMemorialMembersLoading = createSelector(
  getMemorialMembersState,
  state => state.loading
);
export const getMemorialMembersLoaded = createSelector(
  getMemorialMembersState,
  state => state.loaded
);

export const getMemorialMembersSaving = createSelector(
  getMemorialMembersState,
  state => state.saving
);
export const getMemorialMembersSaved = createSelector(
  getMemorialMembersState,
  state => state.saved
);

export const getMemorialOrganization = createSelector(
  getMemorialMembersState,
  state => state.org
);
