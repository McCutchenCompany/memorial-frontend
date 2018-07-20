import { ViewMemorialState } from './../models/view-memorial-state.model';


export const INITIAL_STATE: ViewMemorialState = {
  loading: false,
  loaded: false
};

export function viewMemorialReducer(state: ViewMemorialState = INITIAL_STATE, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
