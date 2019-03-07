import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { PhotoAlbumShowComponent } from '@shared/components/photo-album-show/photo-album-show.component';
import { Memorial } from '@shared/models/memorial.model';
import { Photo } from '@shared/models/photo.model';
import {
  getAlbumEntities,
  getAlbumIds,
  getAlbumLoaded,
  getAlbumLoading,
  getAlbumSaved,
  getAlbumSaving,
  getAllAlbum,
} from '@store/album/album.reducer';
import { getAlbumCount } from '@store/view-memorial';
import { Observable } from 'rxjs';

import { GetAlbumPhotos, GetMoreAlbumPhotos } from './../../../store/album/album.acitons';

@Component({
  selector: 'app-memorial-album',
  templateUrl: './memorial-album.component.html',
  styleUrls: ['./memorial-album.component.scss']
})
export class MemorialAlbumComponent implements OnInit {

  @Input() album: {count: number, photos: Photo[]};
  @Input() memorial: Memorial;

  photos$: Observable<Photo[]>;

  photos: Photo[];

  page = 1;

  albumContainer;

  get displayPhotos() {
    const start = this.page === 1 ? 0 : ((this.page - 1) * 20);
    const end = start + 20;
    return this.photos.slice(start, end);
  }


  checkPageLength() {
    const pageStart = ((this.page - 1) * 20) + 1;
    if (this.page !== 1 && pageStart > this.album.count) {
      this.page -= 1;
    }
  }

  constructor(
    public dialog: MatDialog,
    private store: Store<any>,
    private el: ElementRef
  ) {
    this.photos$ = this.store.pipe(select(getAllAlbum));
    this.photos$.subscribe(photos => this.photos = photos);
  }

  ngOnInit() {
    this.store.dispatch(new GetAlbumPhotos({memorial_id: this.memorial.uuid}));
    this.albumContainer = this.el.nativeElement.querySelector('.container p');
  }

  photoSrc(link) {
    return `${environment.s3.url}${link}`;
  }

  openPhoto(id) {
    this.dialog.open(PhotoAlbumShowComponent, {
      data: {
        selectedPhoto: id,
        entitySelector: getAlbumEntities,
        idSelector: getAlbumIds,
        savingSelector: getAlbumSaving,
        savedSelector: getAlbumSaved,
        loadingSelector: getAlbumLoading,
        loadedSelector: getAlbumLoaded,
        // updateAction: UpdateCreatePhoto,
        getMoreAction: GetMoreAlbumPhotos,
        totalSelector: getAlbumCount,
        memorial: this.memorial,
        context: 'view'
      },
      maxWidth: '700px',
      width: '90%'
    });
  }

  onPage(event) {
    if (this.photos.length < this.album.count) {
      const payload = {memorial_id: this.memorial.uuid, index: this.photos.length};
      this.store.dispatch(new GetMoreAlbumPhotos(payload));
    }
    this.page = event.pageIndex + 1;
    this.albumContainer.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

}
