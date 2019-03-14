import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { PhotoAlbumShowComponent } from '@shared/components/photo-album-show/photo-album-show.component';
import { Memorial } from '@shared/models/memorial.model';
import { Photo } from '@shared/models/photo.model';
import { User } from '@shared/models/user.model';
import { DeletePhoto, GetAlbumPhotos, GetMoreAlbumPhotos, UpdateAlbumPhoto } from '@store/album/album.actions';
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

import { AlbumUploaderComponent } from './../../../shared/components/album-uploader/album-uploader.component';
import { getUser } from './../../../store/auth/auth.reducer';

@Component({
  selector: 'app-memorial-album',
  templateUrl: './memorial-album.component.html',
  styleUrls: ['./memorial-album.component.scss']
})
export class MemorialAlbumComponent implements OnInit, OnChanges {

  @Input() album: {count: number, photos: Photo[]};
  @Input() memorial: Memorial;

  @Output() login: EventEmitter<any> = new EventEmitter<any>();

  photos$: Observable<Photo[]>;
  user$: Observable<User>;
  loading$: Observable<boolean>;

  photos: Photo[];

  page = 1;

  hideMobile = true;

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
    if (this.photos.length < pageStart + 20 && (this.album.count > this.photos.length)) {
      this.getMorePhotos();
    }
  }

  constructor(
    public dialog: MatDialog,
    private store: Store<any>,
    private el: ElementRef
  ) {
    this.photos$ = this.store.pipe(select(getAllAlbum));
    this.user$ = this.store.pipe(select(getUser));
    this.loading$ = this.store.pipe(select(getAlbumLoading));
    this.photos$.subscribe(photos => this.photos = photos);
  }

  ngOnInit() {
    this.store.dispatch(new GetAlbumPhotos({memorial_id: this.memorial.uuid}));
    this.albumContainer = this.el.nativeElement.querySelector('.container p');
  }

  ngOnChanges() {
    this.checkPageLength();
  }

  photoSrc(link) {
    return `${environment.s3.url}${link}`;
  }

  openUploader() {
    this.dialog.open(AlbumUploaderComponent, {
      disableClose: true,
      data: {
        memorial: this.memorial.uuid
      }
    }).afterClosed().subscribe(uploaded => {
      if (uploaded) {
        this.openPhoto(this.photos[0].uuid);
      }
    });
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
        updateAction: UpdateAlbumPhoto,
        getMoreAction: GetMoreAlbumPhotos,
        deleteAction: DeletePhoto,
        totalSelector: getAlbumCount,
        memorial: this.memorial,
        context: 'view'
      },
      maxWidth: '700px',
      width: '90%'
    });
  }

  toggle() {
    this.hideMobile = !this.hideMobile;
  }

  onPage(event) {
    if (this.photos.length < this.album.count) {
      this.getMorePhotos();
    }
    this.page = event.pageIndex + 1;
    this.albumContainer.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  getMorePhotos() {
    const payload = {memorial_id: this.memorial.uuid, index: this.photos.length};
    this.store.dispatch(new GetMoreAlbumPhotos(payload));
  }

  onLogin() {
    this.login.emit();
  }

}
