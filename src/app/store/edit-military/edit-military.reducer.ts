import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EditMilitaryState } from './../models/edit-military-state.model';
import { All, EditMilitaryActionTypes } from './edit-military.actions';

export const INITIAL_STATE: EditMilitaryState = {
  branches: {
    loading: false,
    loaded: false,
    error: null,
    results: []
  },
  medals: {
    loading: false,
    loaded: false,
    error: null,
    branchId: null,
    results: []
  }
};

export function editMilitaryReducer(state: EditMilitaryState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case EditMilitaryActionTypes.GET_BRANCH_MEDALS: {
      return {
        ...state,
        medals: {
          ...state.medals,
          loading: true,
          loaded: false,
          branchId: action.payload
        }
      };
    }
    case EditMilitaryActionTypes.GET_BRANCH_MEDALS_SUCCESS: {
      return {
        ...state,
        medals: {
          ...state.medals,
          loading: false,
          loaded: true,
          results: action.payload
        }
      };
    }
    case EditMilitaryActionTypes.GET_BRANCH_MEDALS_FAILURE: {
      return {
        ...state,
        medals: {
          ...state.medals,
          loading: false,
          loaded: false,
          error: action.payload
        }
      };
    }
    case EditMilitaryActionTypes.GET_MILITARY_BRANCHES: {
     return {
       ...state,
       branches: {
         ...state.branches,
         loading: true,
         loaded: false
       }
     };
    }
    case EditMilitaryActionTypes.GET_MILITARY_BRANCHES_SUCCESS: {
      return {
        ...state,
        branches: {
          ...state.branches,
          loading: false,
          loaded: true,
          results: action.payload
        }
      };
    }
    case EditMilitaryActionTypes.GET_MILITARY_BRANCHES_FAILURE: {
      return {
        ...state,
        branches: {
          ...state.branches,
          loading: false,
          loaded: false,
          error: action.payload
        }
      };
    }
    default: return state;
  }
}

export const getEditMilitaryState = createFeatureSelector<EditMilitaryState>('editMilitary');

export const getBranchesState = createSelector(
  getEditMilitaryState,
  state => state.branches
);

export const getBranchesLoading = createSelector(
  getBranchesState,
  state => state.loading
);
export const getBranchesLoaded = createSelector(
  getBranchesState,
  state => state.loaded
);
export const getBranchesError = createSelector(
  getBranchesState,
  state => state.error
);
export const getBranches = createSelector(
  getBranchesState,
  state => state.results
);

export const getMedalsState = createSelector(
  getEditMilitaryState,
  state => state.medals
);
export const getMedalsLoading = createSelector(
  getMedalsState,
  state => state.loading
);
export const getMedalsLoaded = createSelector(
  getMedalsState,
  state => state.loaded
);
export const getMedals = createSelector(
  getMedalsState,
  state => state.results
);
export const getMedalsBranch = createSelector(
  getMedalsState,
  state => state.branchId
);
