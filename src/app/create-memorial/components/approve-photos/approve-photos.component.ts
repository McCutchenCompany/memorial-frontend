import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { UploadDialogComponent } from '@shared/components/upload-dialog/upload-dialog.component';
import { Photo } from '@shared/models/photo.model';
import { getCreateMemorial } from '@store/create-memorial';
import { getAllCreatePhotos, getCreateAllPhotoTotal } from '@store/create-photos/reducers';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

import { UpdateCreateMemorial } from './../../../store/create-memorial/create-memorial.actions';
import { GetCreatePhotos } from './../../../store/create-photos/photos.actions';

@Component({
  selector: 'app-approve-photos',
  templateUrl: './approve-photos.component.html',
  styleUrls: ['./approve-photos.component.scss']
})
export class ApprovePhotosComponent implements OnInit {

  memorial$: Observable<any>;
  total$: Observable<number>;
  allPhotos$: Observable<Photo[]>;

  memorialUUID;
  public: boolean;

  constructor(
    private store: Store<CreateMemorialState>,
    public dialog: MatDialog
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.total$ = this.store.pipe(select(getCreateAllPhotoTotal));
    this.allPhotos$ = this.store.pipe(select(getAllCreatePhotos));
    this.memorial$.subscribe(memorial => {
      this.memorialUUID = memorial.memorial.uuid;
      this.public = memorial.memorial.public_photo;
      this.store.dispatch(new GetCreatePhotos({memorial_id: this.memorialUUID}));
    });
  }

  ngOnInit() {
  }

  togglePublic() {
    const body = {
      uuid: this.memorialUUID,
      body: {
        public_photo: !this.public
      }
    };
    this.store.dispatch(new UpdateCreateMemorial(body));
  }

  onOpenUpload() {
    this.dialog.open(UploadDialogComponent, {
      data: {
        context: 'create-album',
        memorial: this.memorialUUID,
        action: 'upload'
      }
    });
  }

}
