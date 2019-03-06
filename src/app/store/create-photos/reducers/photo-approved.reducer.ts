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

export interface ApprovedPhotosState extends EntityState<Photo> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const approvedPhotoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  selectId: (photo: Photo) => photo.uuid,
  sortComparer: sortByDate
});

export const INITIAL_STATE: ApprovedPhotosState = approvedPhotoAdapter.getInitialState({
  ids: [],
  loading: false,
  loaded: false,
  error: null
});

export function approvedPhotoReducer(state = INITIAL_STATE, action: All): ApprovedPhotosState {
  switch (action.type) {
    case CreatePhotosActionTypes.GET_CREATE_PHOTOS_SUCCESS: {
      if (action.payload.approved) {
        return approvedPhotoAdapter.addAll(action.payload.approved, {
          ...state
        });
      } else {
        return state;
      }
    }
    case CreatePhotosActionTypes.UPDATE_CREATE_APPROVED_PHOTO_SUCCESS: {
      return approvedPhotoAdapter.updateOne({id: action.payload.uuid, changes: action.payload}, state);
    }
    case CreatePhotosActionTypes.APPROVE_NEED_APPROVAL_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.APPROVE_DENIED_PHOTO_SUCCESS:
    case CreatePhotosActionTypes.UPLOAD_CREATE_PHOTO_SUCCESS: {
      return approvedPhotoAdapter.addOne(action.payload, {...state});
    }
    case CreatePhotosActionTypes.DENY_APPROVED_PHOTO_SUCCESS: {
      return approvedPhotoAdapter.removeOne(action.payload.uuid, state);
    }
    default: return state;
  }
}
