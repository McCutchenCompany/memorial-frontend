import { UserProfileState } from '../models/user-profile-state.model';
import { All, UserProfileActionTypes } from './user-profile.actions';

export const INITIAL_STATE: UserProfileState = {
  loading: false,
  loaded: false,
  error: null
};

export function userProfileReducer(state: UserProfileState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case UserProfileActionTypes.CREATE_MEMORIAL:
    case UserProfileActionTypes.PURCHASE_LICENSE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case UserProfileActionTypes.CREATE_MEMORIAL_FAILURE:
    case UserProfileActionTypes.PURCHASE_LICENSE_FAILURE: {
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
