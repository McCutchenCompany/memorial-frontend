import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Photo } from '@shared/models/photo.model';

import { All, CreatePhotosActionTypes } from './../photos.actions';

export interface ApprovedPhotosState extends EntityState<Photo> {
  ids: string[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const approvedPhotoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  selectId: (photo: Photo) => photo.uuid,
  sortComparer: false
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
      return approvedPhotoAdapter.addMany(action.payload.approved, {
        ...state
      });
    }
    default: return state;
  }
}
