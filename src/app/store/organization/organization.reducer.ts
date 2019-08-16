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
    case OrganizationActionTypes.JOIN_ORG:
    case OrganizationActionTypes.GET_ORG: {
      if (state.organization && state.organization.uuid === action.payload) {
        return;
      } else {
        return {
          ...state,
          loading: true,
          loaded: false
        };
      }
    }
    case OrganizationActionTypes.JOIN_ORG_SUCCESS:
    case OrganizationActionTypes.GET_ORG_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        organization: action.payload
      };
    }
    case OrganizationActionTypes.JOIN_ORG_FAILURE:
    case OrganizationActionTypes.GET_ORG_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case OrganizationActionTypes.UPDATE_ORG:
    case OrganizationActionTypes.REMOVE_ORG_IMAGE:
    case OrganizationActionTypes.REPLACE_ORG_IMAGE:
    case OrganizationActionTypes.UPLOAD_ORG_IMAGE: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case OrganizationActionTypes.UPDATE_ORG_SUCCESS:
    case OrganizationActionTypes.REMOVE_ORG_IMAGE_SUCCESS:
    case OrganizationActionTypes.REPLACE_ORG_IMAGE_SUCCESS:
    case OrganizationActionTypes.UPLOAD_ORG_IMAGE_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        organization: action.payload
      };
    }
    case OrganizationActionTypes.UPDATE_ORG_FAILURE:
    case OrganizationActionTypes.REMOVE_ORG_IMAGE_FAILURE:
    case OrganizationActionTypes.REPLACE_ORG_IMAGE_FAILURE:
    case OrganizationActionTypes.UPLOAD_ORG_IMAGE_FAILURE: {
      return {
        ...state,
        saving: false,
        saved: false,
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
export const getOrganizationError = createSelector(
  getOrganizationState,
  state => state.error
);
export const getOrganization = createSelector(
  getOrganizationState,
  state => state.organization
);
