import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Photo } from '@shared/models/photo.model';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ViewMemorialService } from './../../view-memorial/services/view-memorial.service';
import {
  AlbumActionType,
  GetAlbumPhotos,
  GetAlbumPhotosFailure,
  GetAlbumPhotosSuccess,
  GetMoreAlbumPhotos,
  GetMoreAlbumPhotosFailure,
  GetMoreAlbumPhotosSuccess,
} from './album.acitons';

@Injectable()
export class AlbumEffects {
  constructor(
    private actions: Actions,
    private api: ViewMemorialService
  ) {}

  @Effect()
  getAlbumPhotos$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.GET_ALBUM_PHOTOS),
    switchMap((action: GetAlbumPhotos) => this.api.getAlbumPhotos(action.payload.memorial_id, 0).pipe(
      map((res: Photo[]) => new GetAlbumPhotosSuccess(res)),
      catchError(error => of(new GetAlbumPhotosFailure(error)))
    ))
  );

  @Effect()
  getMoreAlbumPhotos$: Observable<Action> = this.actions.pipe(
    ofType(AlbumActionType.GET_MORE_ALBUM_PHOTOS),
    switchMap((action: GetMoreAlbumPhotos) => this.api.getAlbumPhotos(action.payload.memorial_id, action.payload.index).pipe(
      map((res: Photo[]) => new GetMoreAlbumPhotosSuccess(res)),
      catchError(error => of(new GetMoreAlbumPhotosFailure(error)))
    ))
  );

}
