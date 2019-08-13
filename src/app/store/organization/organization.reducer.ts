import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrganizationState } from './../models/organization-state.model';
import { All, OrganizationActionTypes } from './organization.actions';

export const INITIAL_STATE: OrganizationState = {
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null,
  organization: null
};

export function organizationReducer(state: OrganizationState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case OrganizationActionTypes.CREATE_ORG: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case OrganizationActionTypes.CREATE_ORG_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        organization: action.payload
      };
    }
    case OrganizationActionTypes.CREATE_ORG_FAILURE: {
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload
      };
    }
    case OrganizationActionTypes.GET_ORG: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case OrganizationActionTypes.GET_ORG_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        organization: action.payload
      };
    }
    case OrganizationActionTypes.GET_ORG_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getOrganizationState = createFeatureSelector<OrganizationState>('organization');

export const getOrganizationSaving = createSelector(
  getOrganizationState,
  state => state.saving
);
export const getOrganizationSaved = createSelector(
  getOrganizationState,
  state => state.saved
);
export const getOrganizationLoading = createSelector(
  getOrganizationState,
  state => state.loading
);
export const getOrganizationLoaded = createSelector(
  getOrganizationState,
  state => state.loaded
);
export const getOrganization = createSelector(
  getOrganizationState,
  state => state.organization
);
