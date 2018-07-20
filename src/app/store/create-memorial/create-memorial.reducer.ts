import { CreateMemorialState } from '../models/create-memorial-state.model';

export const INITIAL_STATE: CreateMemorialState = {
  loading: false,
  loaded: false
};

export function createMemorialReducer(state: CreateMemorialState = INITIAL_STATE, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
