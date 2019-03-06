import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '@environments/environment';
import { PhotoAlbumShowComponent } from '@shared/components/photo-album-show/photo-album-show.component';
import { Memorial } from '@shared/models/memorial.model';
import { Photo } from '@shared/models/photo.model';
import { UpdateCreatePhoto } from '@store/create-photos/photos.actions';
import {
  getApprovedPhotoEntities,
  getApprovedPhotoIds,
  getCreateAllPhotoEntities,
  getCreateAllPhotoIds,
  getCreatePhotosSaved,
  getCreatePhotosSaving,
  getDeniedPhotoEntities,
  getDeniedPhotoIds,
  getNeedApprovalPhotoEntities,
  getNeedApprovalPhotoIds,
} from '@store/create-photos/reducers';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.scss']
})
export class AlbumViewerComponent implements OnInit {

  @Input() photos: Photo[];
  @Input() total: number;
  @Input() memorial: Memorial;
  @Input() context: 'create-all' | 'all' | 'approved' | 'denied' | 'need-approval';

  page = 1;

  entitySelector;
  idSelector;

  get displayPhotos() {
    const start = this.page === 1 ? 0 : ((this.page - 1) * 20) - 1;
    const end = start + 20;
    return this.photos.slice(start, end);
  }

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.setContext();
  }

  setContext() {
    switch (this.context) {
      case 'create-all': {
        this.entitySelector = getCreateAllPhotoEntities;
        this.idSelector = getCreateAllPhotoIds;
        break;
      }
      case 'approved': {
        this.entitySelector = getApprovedPhotoEntities;
        this.idSelector = getApprovedPhotoIds;
        break;
      }
      case 'denied': {
        this.entitySelector = getDeniedPhotoEntities;
        this.idSelector = getDeniedPhotoIds;
        break;
      }
      case 'need-approval': {
        this.entitySelector = getNeedApprovalPhotoEntities;
        this.idSelector = getNeedApprovalPhotoIds;
        break;
      }
      default: break;
    }
  }

  photoSrc(link) {
    return `${environment.s3.url}${link}`;
  }

  openPhoto(id) {
    this.dialog.open(PhotoAlbumShowComponent, {
      data: {
        selectedPhoto: id,
        entitySelector: this.entitySelector,
        idSelector: this.idSelector,
        savingSelector: getCreatePhotosSaving,
        savedSelector: getCreatePhotosSaved,
        updateAction: UpdateCreatePhoto,
        total: this.total,
        memorial: this.memorial
      },
      maxWidth: '700px',
      width: '90%'
    });
  }

}
