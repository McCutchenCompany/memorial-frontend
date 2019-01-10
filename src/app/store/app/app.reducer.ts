import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../models/app-state.model';
import { All, AppActionTypes } from './app.actions';

export const INITIAL_STATE: AppState = {
  loading: false,
  loaded: false,
  purchasing: false,
  purchased: false,
  error: null,
  discount: {
    percent: null,
    code: null,
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
        purchased: true
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
