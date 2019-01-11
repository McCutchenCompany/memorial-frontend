import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../models/app-state.model';
import { All, AppActionTypes } from './app.actions';

export const INITIAL_STATE: AppState = {
  loading: false,
  loaded: false,
  purchasing: false,
  purchased: false,
  email: {
    sending: false,
    sent: false,
    error: null,
  },
  error: null,
  discount: {
    percent: 50,
    code: '404b3a80-df95-4915-be00-4c8b3bfe3803',
    one_time_use: false,
    error: null
  }
};

export function appReducer(state: AppState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case AppActionTypes.CHECK_DISCOUNT: {
      return {
        ...state,
        loading: true,
        loaded: false,
        discount: INITIAL_STATE.discount
      };
    }
    case AppActionTypes.CHECK_DISCOUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        discount: {
          ...action.payload,
          error: INITIAL_STATE.discount.error
        }
      };
    }
    case AppActionTypes.CHECK_DISCOUNT_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        discount: {
          ...INITIAL_STATE.discount,
          error: action.payload.error
        }
      };
    }
    case AppActionTypes.PURCHASE_LICENSE: {
      return {
        ...state,
        purchasing: true,
        purchased: false,
        error: INITIAL_STATE.error
      };
    }
    case AppActionTypes.PURCHASE_LICENSE_SUCCESS: {
      return {
        ...state,
        purchasing: false,
        purchased: true,
        discount: INITIAL_STATE.discount
      };
    }
    case AppActionTypes.PURCHASE_LICENSE_FAILURE: {
      return {
        ...state,
        purchasing: false,
        purchased: false,
        error: action.payload
      };
    }
    case AppActionTypes.CLEAR_DISCOUNT: {
      return {
        ...state,
        discount: INITIAL_STATE.discount
      };
    }
    case AppActionTypes.SEND_BUG_EMAIL:
    case AppActionTypes.SEND_SUPPORT_EMAIL: {
      return {
        ...state,
        email: {
          sending: true,
          sent: false,
          error: INITIAL_STATE.email.error
        }
      };
    }
    case AppActionTypes.SEND_SUPPORT_EMAIL_SUCCESS:
    case AppActionTypes.SEND_BUG_EMAIL_SUCCESS: {
      return {
        ...state,
        email: {
          sending: false,
          sent: true,
        }
      };
    }
    case AppActionTypes.SEND_BUG_EMAIL_FAILURE:
    case AppActionTypes.SEND_SUPPORT_EMAIL_FAILURE: {
      return {
        ...state,
        email: {
          sending: false,
          sent: false,
          error: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getAppState = createFeatureSelector<AppState>('app');

export const getDiscount = createSelector(
  getAppState,
  state => state.discount
);

export const getDiscountPercent = createSelector(
  getDiscount,
  state => state.percent
);
export const getDiscountCode = createSelector(
  getDiscount,
  state => state.code
);
export const getDiscountError = createSelector(
  getDiscount,
  state => state.error
);
export const getPurchasing = createSelector(
  getAppState,
  state => state.purchasing
);
export const getPurchased = createSelector(
  getAppState,
  state => state.purchased
);
export const getAppError = createSelector(
  getAppState,
  state => state.error
);
export const getEmailState = createSelector(
  getAppState,
  state => state.email
);
