import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Photo } from '@shared/models/photo.model';

import { All, CreatePhotosActionTypes } from './../photos.actions';

function sortByDate(p1, p2) {
  const p1Date = new Date(p1.created_at);
  const p2Date = new Date(p2.created_at);
  if (p1Date > p2Date) {
    return -1;
  } else {
    return 1;
  }
}

export interface DeniedPhotosState extends EntityState<Photo> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const deniedPhotoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  selectId: (photo: Photo) => photo.uuid,
  sortComparer: sortByDate
});

export const INITIAL_STATE: DeniedPhotosState = deniedPhotoAdapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  error: null
});

export function deniedPhotoReducer(state = INITIAL_STATE, action: All): DeniedPhotosState {
  switch (action.type) {
    case CreatePhotosActionTypes.GET_CREATE_PHOTOS_SUCCESS: {
      if (action.payload.denied) {
        return deniedPhotoAdapter.addAll(action.payload.denied, {
          ...state
        });
      } else {
        return state;
      }
    }
    case CreatePhotosActionTypes.UPDATE_CREATE_DENIED_PHOTO_SUCCESS: {
      return deniedPhotoAdapter.updateOne({id: action.payload.uuid, changes: action.payload}, state);
    }
    case CreatePhotosActionTypes.APPROVE_DENIED_PHOTO_SUCCESS: {
      return deniedPhotoAdapter.removeOne(action.payload.uuid, state);
    }
    case CreatePhotosActionTypes.DENY_APPROVED_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.DENY_NEED_APPROVAL_PHOTO_SUCCESS: {
      return deniedPhotoAdapter.addOne(action.payload, state);
    }
    default: return state;
  }
}
