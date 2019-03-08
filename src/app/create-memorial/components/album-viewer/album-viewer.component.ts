import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { PhotoAlbumShowComponent } from '@shared/components/photo-album-show/photo-album-show.component';
import { Memorial } from '@shared/models/memorial.model';
import { Photo } from '@shared/models/photo.model';
import { GetMorePhotos, UpdateCreatePhoto } from '@store/create-photos/photos.actions';
import {
  getApprovedPhotoEntities,
  getApprovedPhotoIds,
  getCreateAllPhotoEntities,
  getCreateAllPhotoIds,
  getCreateAllPhotoTotal,
  getCreateApprovedCount,
  getCreateApprovedPhotosLoaded,
  getCreateApprovedPhotosLoading,
  getCreateDeniedCount,
  getCreateDeniedPhotosLoaded,
  getCreateDeniedPhotosLoading,
  getCreateNeedApprovalCount,
  getCreateNeedApprovalPhotosLoaded,
  getCreateNeedApprovalPhotosLoading,
  getCreatePhotosLoaded,
  getCreatePhotosLoading,
  getCreatePhotosSaved,
  getCreatePhotosSaving,
  getDeniedPhotoEntities,
  getDeniedPhotoIds,
  getNeedApprovalPhotoEntities,
  getNeedApprovalPhotoIds,
} from '@store/create-photos/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.scss']
})
export class AlbumViewerComponent implements OnInit, OnChanges {

  @Input() photos: Photo[];
  @Input() total: number;
  @Input() memorial: Memorial;
  @Input() context: 'create-all' | 'all' | 'approved' | 'denied' | 'need-approval';

  page = 1;

  entitySelector;
  idSelector;
  totalSelector;
  loadingSelector;
  loadedSelector;
  getMoreAction;

  loading$: Observable<boolean>;

  get displayPhotos() {
    const start = this.page === 1 ? 0 : ((this.page - 1) * 20);
    const end = start + 20;
    return this.photos.slice(start, end);
  }

  constructor(
    public dialog: MatDialog,
    private store: Store<any>
  ) {
  }

  ngOnInit() {
    this.setContext();
  }

  ngOnChanges() {
    this.checkPageLength();
  }

  checkPageLength() {
    const pageStart = ((this.page - 1) * 20) + 1;
    if (this.page !== 1 && pageStart > this.total) {
      this.page -= 1;
    }
    if (this.photos.length < pageStart + 20 && (this.total > this.photos.length)) {
      this.getMorePhotos();
    }
  }

  setContext() {
    switch (this.context) {
      case 'create-all': {
        this.loading$ = this.store.pipe(select(getCreatePhotosLoading));
        this.loadingSelector = getCreatePhotosLoading;
        this.loadedSelector = getCreatePhotosLoaded;
        this.entitySelector = getCreateAllPhotoEntities;
        this.idSelector = getCreateAllPhotoIds;
        this.totalSelector = getCreateAllPhotoTotal;
        this.getMoreAction = GetMorePhotos;
        break;
      }
      case 'approved': {
        this.loading$ = this.store.pipe(select(getCreateApprovedPhotosLoading));
        this.loadingSelector = getCreateApprovedPhotosLoading;
        this.loadedSelector = getCreateApprovedPhotosLoaded;
        this.entitySelector = getApprovedPhotoEntities;
        this.idSelector = getApprovedPhotoIds;
        this.totalSelector = getCreateApprovedCount;
        this.getMoreAction = GetMorePhotos;
        break;
      }
      case 'denied': {
        this.loading$ = this.store.pipe(select(getCreateDeniedPhotosLoading));
        this.loadingSelector = getCreateDeniedPhotosLoading;
        this.loadedSelector = getCreateDeniedPhotosLoaded;
        this.entitySelector = getDeniedPhotoEntities;
        this.idSelector = getDeniedPhotoIds;
        this.totalSelector = getCreateDeniedCount;
        this.getMoreAction = GetMorePhotos;
        break;
      }
      case 'need-approval': {
        this.loading$ = this.store.pipe(select(getCreateNeedApprovalPhotosLoading));
        this.loadingSelector = getCreateNeedApprovalPhotosLoading;
        this.loadedSelector = getCreateNeedApprovalPhotosLoaded;
        this.entitySelector = getNeedApprovalPhotoEntities;
        this.idSelector = getNeedApprovalPhotoIds;
        this.totalSelector = getCreateNeedApprovalCount;
        this.getMoreAction = GetMorePhotos;
        break;
      }
      default: break;
    }
  }

  photoSrc(link) {
    return `${environment.s3.url}${link}`;
  }

  onPage(event) {
    if (this.photos.length < this.total) {
      this.getMorePhotos();
    }
    this.page = event.pageIndex + 1;
  }

  getMorePhotos() {
    let payload;
    switch (this.context) {
      case 'create-all': {
        payload = {memorial_id: this.memorial.uuid, index: this.photos.length};
        break;
      }
      case 'approved': {
        payload = {memorial_id: this.memorial.uuid, approved: this.photos.length};
        break;
      }
      case 'denied': {
        payload = {memorial_id: this.memorial.uuid, denied: this.photos.length};
        break;
      }
      case 'need-approval': {
        payload = {memorial_id: this.memorial.uuid, waiting: this.photos.length};
        break;
      }
      default: break;
    }
    this.store.dispatch(new GetMorePhotos(payload));
  }

  openPhoto(id) {
    this.dialog.open(PhotoAlbumShowComponent, {
      data: {
        selectedPhoto: id,
        entitySelector: this.entitySelector,
        idSelector: this.idSelector,
        savingSelector: getCreatePhotosSaving,
        savedSelector: getCreatePhotosSaved,
        loadingSelector: this.loadingSelector,
        loadedSelector: this.loadedSelector,
        updateAction: UpdateCreatePhoto,
        getMoreAction: this.getMoreAction,
        totalSelector: this.totalSelector,
        memorial: this.memorial,
        context: this.context
      },
      maxWidth: '700px',
      width: '90%'
    });
  }

}
