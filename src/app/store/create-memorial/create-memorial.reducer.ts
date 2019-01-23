import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CreateMemorialState } from '../models/create-memorial-state.model';
import { All, CreateMemorialActionTypes } from './create-memorial.actions';

export const INITIAL_STATE: CreateMemorialState = {
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  memorial: {
    memorial: null,
    location: null,
    timeline: [],
    memories: []
  },
  editingTimeline: {
    editingIds: []
  },
  addressSearch: {
    address: null,
    latitude: 38.876422,
    longitude: -77.073024,
    zoom: 1
  },
  error: null
};

export function createMemorialReducer(state: CreateMemorialState = INITIAL_STATE, action: All) {
  switch (action.type) {
    case CreateMemorialActionTypes.SEARCH_ADDRESS:
    case CreateMemorialActionTypes.GET_CREATE_MEMORIAL: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case CreateMemorialActionTypes.SEARCH_ADDRESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        addressSearch: action.payload
      };
    }
    case CreateMemorialActionTypes.GET_CREATE_MEMORIAL_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        memorial: action.payload,
        addressSearch: {
          ...state.addressSearch,
          latitude: action.payload.location ? action.payload.location.latitude : INITIAL_STATE.addressSearch.latitude,
          longitude: action.payload.location ? action.payload.location.longitude : INITIAL_STATE.addressSearch.longitude,
          zoom: action.payload.location ? 15 : INITIAL_STATE.addressSearch.zoom
        }
      };
    }
    case CreateMemorialActionTypes.SEARCH_ADDRESS_FAILURE:
    case CreateMemorialActionTypes.GET_CREATE_MEMORIAL_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case CreateMemorialActionTypes.REMOVE_TIMELINE_ENTRY:
    case CreateMemorialActionTypes.UPDATE_MEMORY_STATUS:
    case CreateMemorialActionTypes.UPDATE_LOCATION:
    case CreateMemorialActionTypes.UPDATE_TIMELINE:
    case CreateMemorialActionTypes.UPDATE_SINGLE_TIMELINE:
    case CreateMemorialActionTypes.ADD_TIMELINE_ENTRY:
    case CreateMemorialActionTypes.REMOVE_TIMELINE_FILE:
    case CreateMemorialActionTypes.UPLOAD_TIMELINE_FILE:
    case CreateMemorialActionTypes.REPLACE_TIMELINE_FILE:
    case CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE:
    case CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE:
    case CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE:
    case CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case CreateMemorialActionTypes.UPDATE_LOCATION_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        memorial: {
          ...state.memorial,
          location: action.payload
        }
      };
    }
    case CreateMemorialActionTypes.UPDATE_SINGLE_TIMELINE_SUCCESS:
    case CreateMemorialActionTypes.REMOVE_TIMELINE_ENTRY_SUCCESS:
    case CreateMemorialActionTypes.UPDATE_TIMELINE_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        memorial: {
          ...state.memorial,
          timeline: action.payload.reverse()
        }
      };
    }
    case CreateMemorialActionTypes.ADD_TIMELINE_ENTRY_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        memorial: {
          ...state.memorial,
          timeline: action.payload.reverse()
        },
        editingTimeline: {
          editingIds: [
            ...state.editingTimeline.editingIds,
            action.payload[action.payload.length - 1].uuid
          ]
        }
      };
    }
    case CreateMemorialActionTypes.REPLACE_TIMELINE_FILE_SUCCESS:
    case CreateMemorialActionTypes.REMOVE_TIMELINE_FILE_SUCCESS:
    case CreateMemorialActionTypes.UPLOAD_TIMELINE_FILE_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        memorial: {
          ...state.memorial,
          ...action.payload,
          timeline: action.payload.timeline.reverse()
        }
      };
    }
    case CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE_SUCCESS:
    case CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE_SUCCESS:
    case CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE_SUCCESS:
    case CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        memorial: {
          ...state.memorial,
          memorial: action.payload
        }
      };
    }
    case CreateMemorialActionTypes.UPDATE_SINGLE_TIMELINE_FAILURE:
    case CreateMemorialActionTypes.REMOVE_TIMELINE_ENTRY_FAILURE:
    case CreateMemorialActionTypes.UPDATE_MEMORY_STATUS_FAILURE:
    case CreateMemorialActionTypes.UPDATE_LOCATION_FAILURE:
    case CreateMemorialActionTypes.UPDATE_TIMELINE_FAILURE:
    case CreateMemorialActionTypes.ADD_TIMELINE_ENTRY_FAILURE:
    case CreateMemorialActionTypes.REMOVE_TIMELINE_FILE_FAILURE:
    case CreateMemorialActionTypes.UPLOAD_TIMELINE_FILE_FAILURE:
    case CreateMemorialActionTypes.REPLACE_TIMELINE_FILE_FAILURE:
    case CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE_FAILURE:
    case CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE_FAILURE:
    case CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE_FAILURE:
    case CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL_FAILURE: {
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload
      };
    }
    case CreateMemorialActionTypes.SET_EDITING_TIMELINE: {
      return {
        ...state,
        editingTimeline: {
          ...state.editingTimeline,
          editingIds: action.payload
        }
      };
    }
    case CreateMemorialActionTypes.UPDATE_MEMORY_STATUS_SUCCESS: {
      return {
        ...state,
        saving: false,
        saved: true,
        memorial: {
          ...state.memorial,
          memories: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getCreateMemorialState = createFeatureSelector<CreateMemorialState>('createMemorial');

export const getCreateMemorial = createSelector(
  getCreateMemorialState,
  state => state.memorial
);
export const getCreateMemorialLocation = createSelector(
  getCreateMemorial,
  state => state.location
);
export const getCreateLoading = createSelector(
  getCreateMemorialState,
  state => state.loading
);
export const getCreateLoaded = createSelector(
  getCreateMemorialState,
  state => state.loaded
);
export const getCreatedSaving = createSelector(
  getCreateMemorialState,
  state => state.saving
);
export const getCreatedSaved = createSelector(
  getCreateMemorialState,
  state => state.saved
);
export const getEditingIds = createSelector(
  getCreateMemorialState,
  state => state.editingTimeline.editingIds
);
export const getCreateSearchAddress = createSelector(
  getCreateMemorialState,
  state => state.addressSearch
);
export const getCreateError = createSelector(
  getCreateMemorialState,
  state => state.error
);
