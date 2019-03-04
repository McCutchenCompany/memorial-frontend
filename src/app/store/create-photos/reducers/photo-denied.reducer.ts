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
    default: return state;
  }
}
