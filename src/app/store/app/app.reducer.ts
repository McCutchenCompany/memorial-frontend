import { AppState } from '../models/app-state.model';

export const INITIAL_STATE: AppState = {
  loading: false,
  loaded: false
};

export function appReducer(state: AppState = INITIAL_STATE, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
