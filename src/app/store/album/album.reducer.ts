import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Photo } from '@shared/models/photo.model';
import { AlbumActionType, All } from '@store/album/album.actions';

function sortByDate(p1, p2) {
  const p1Date = new Date(p1.created_at);
  const p2Date = new Date(p2.created_at);
  if (p1Date > p2Date) {
    return -1;
  } else {
    return 1;
  }
}

export interface AlbumState extends EntityState<any> {
  ids: string[];
  photos: Photo[];
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  error: any;
}

export const albumAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  selectId: (photo: Photo) => photo.uuid,
  sortComparer: sortByDate
});

export const INITIAL_STATE: AlbumState = albumAdapter.getInitialState({
  ids: [],
  photos: [],
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null
});

export function albumReducer(state = INITIAL_STATE, action: All): AlbumState {
  switch (action.type) {
    case AlbumActionType.GET_MORE_ALBUM_PHOTOS:
    case AlbumActionType.GET_ALBUM_PHOTOS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case AlbumActionType.GET_ALBUM_PHOTOS_SUCCESS: {
      return albumAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case AlbumActionType.GET_MORE_ALBUM_PHOTOS_SUCCESS: {
      return albumAdapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case AlbumActionType.GET_ALBUM_PHOTOS_FAILURE:
    case AlbumActionType.GET_MORE_ALBUM_PHOTOS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case AlbumActionType.UPLOAD_ALBUM_PHOTO:
    case AlbumActionType.UPDATE_ALBUM_PHOTO: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }
    case AlbumActionType.UPLOAD_ALBUM_PHOTO_SUCCESS: {
      return albumAdapter.addOne(action.payload, {
        ...state,
        saving: false,
        saved: true
      });
    }
    case AlbumActionType.UPDATE_ALBUM_PHOTO_SUCCESS: {
      return albumAdapter.updateOne({id: action.payload.uuid, changes: action.payload}, {
        ...state,
        saving: false,
        saved: true
      });
    }
    case AlbumActionType.UPLOAD_ALBUM_PHOTO_FAILURE:
    case AlbumActionType.UPDATE_ALBUM_PHOTO_FAILURE: {
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload
      };
    }
    default: return state;
  }
}

export const getAlbumState = createFeatureSelector<AlbumState>('album');

export const getAlbumLoading = createSelector(
  getAlbumState,
  state => state.loading
);
export const getAlbumLoaded = createSelector(
  getAlbumState,
  state => state.loaded
);
export const getAlbumSaving = createSelector(
  getAlbumState,
  state => state.saving
);
export const getAlbumSaved = createSelector(
  getAlbumState,
  state => state.saved
);

export const {
  selectIds: getAlbumIds,
  selectEntities: getAlbumEntities,
  selectAll: getAllAlbum,
  selectTotal: getAlbumTotal
} = albumAdapter.getSelectors(getAlbumState);
