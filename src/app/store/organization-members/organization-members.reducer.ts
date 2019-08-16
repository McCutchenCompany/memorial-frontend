import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Paginator } from '@shared/models/paginator.model';
import { User } from '@shared/models/user.model';

import { All, OrgMemberActionTypes } from './organization-members.actions';

export interface OrgMemberState extends EntityState<any> {
  ids: string[];
  paginator: Paginator;
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  error: any;
}

export const orgMemberAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.uuid,
  sortComparer: false
});

export const INITIAL_STATE: OrgMemberState = orgMemberAdapter.getInitialState({
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

export function orgMemberReducer(state = INITIAL_STATE, action: All): OrgMemberState {
  switch (action.type) {
    case OrgMemberActionTypes.GET_FIRST_ORG_MEMBERS: {
      return orgMemberAdapter.removeAll({
        ...state,
        loading: true,
        loaded: false,
        paginator: INITIAL_STATE.paginator
      });
    }
    case OrgMemberActionTypes.GET_ORG_MEMBERS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case OrgMemberActionTypes.GET_ORG_MEMBERS_SUCCESS: {
      return orgMemberAdapter.addAll(action.payload.results, {
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
    case OrgMemberActionTypes.GET_ORG_MEMBERS_FAILURE: {
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


export const getOrgMembersState = createFeatureSelector<OrgMemberState>('org-members');

export const {
  selectIds: getOrgMembersIds,
  selectAll: getAllOrgMembers,
  selectEntities: getOrgMembersEntities,
  selectTotal: getOrgMembersTotal
} = orgMemberAdapter.getSelectors(getOrgMembersState);

export const getOrgMembersPaginator = createSelector(
  getOrgMembersState,
  state => state.paginator
);

export const getOrgMembersLoading = createSelector(
  getOrgMembersState,
  state => state.loading
);
export const getOrgMembersLoaded = createSelector(
  getOrgMembersState,
  state => state.loaded
);

export const getOrgMembersSaving = createSelector(
  getOrgMembersState,
  state => state.saving
);
export const getOrgMembersSaved = createSelector(
  getOrgMembersState,
  state => state.saved
);
