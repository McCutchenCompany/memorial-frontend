import { FindMemorialState } from '../models/find-memorial-state.model';

export const INITIAL_STATE: FindMemorialState = {
  loading: false,
  loaded: false
};

export function findMemorialReducer(state: FindMemorialState = INITIAL_STATE, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
