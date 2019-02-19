import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '@store/models/auth-state.model';

import { AuthActions, AuthActionTypes } from './auth.actions';


export const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  token: null,
  user: {
    uuid: null,
    first_name: null,
    last_name: null,
    email: null,
    licenses: null,
    licenses_in_use: null,
    auth0_id: null,
    created_at: null,
    updated_at: null,
    a0: null,
    memorials: []
  },
  error: null,
  loading: false,
  loaded: false
};

export function reducer(state: AuthState = INITIAL_STATE, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.SIGNOUT: {
      return INITIAL_STATE;
    }
    case AuthActionTypes.AUTH0_LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.accessToken,
        error: null,
        user: { ...state.user, a0: action.payload }
      };
    }
    case AuthActionTypes.AUTH0_LOGIN_FAILURE: {
      return {
        ...INITIAL_STATE,
        error: 'Unable to log in'
      };
    }
    case AuthActionTypes.LOCAL_TOKEN_VALID: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.accessToken,
        user: {
          ...state.user,
          a0: {
            sub: action.payload.decodedToken['sub'],
            error: null,
            errorDescription: null
          }
        }
      };
    }
    case AuthActionTypes.LOCAL_TOKEN_INVALID: {
      return INITIAL_STATE;
    }
    case AuthActionTypes.UPDATE_USER_MEMORIAL:
    case AuthActionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case AuthActionTypes.GET_PROFILE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case AuthActionTypes.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user,
          memorials: action.payload.memorials
        },
        loading: false,
        loaded: true
      };
    }
    case AuthActionTypes.UPDATE_USER_MEMORIAL_FAILURE:
    case AuthActionTypes.GET_PROFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case AuthActionTypes.UPDATE_USER_MEMORIAL_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: {
          ...state.user,
          memorials: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getIsAuthenticated = createSelector(
  getAuthState,
  state => state.isAuthenticated
);
export const getUser = createSelector(
  getAuthState,
  state => state.user
);
export const getAuthLoading = createSelector(
  getAuthState,
  state => state.loading
);
export const getAuthLoaded = createSelector(
  getAuthState,
  state => state.loaded
);
