import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { getCreatedSaved, getCreatedSaving } from '@store/create-memorial';
import {
  ReplaceMemorialImage,
  ReplaceTimelineFile,
  UploadMemorialImage,
  UploadTimelineFile,
} from '@store/create-memorial/create-memorial.actions';
import { UploadCreatePhoto } from '@store/create-photos/photos.actions';
import { getCreatePhotosSaved, getCreatePhotosSaving } from '@store/create-photos/reducers';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { getOrganizationSaved, getOrganizationSaving } from '@store/organization/organization.reducer';
import { Observable } from 'rxjs';

import { ReplaceOrgImage, UploadOrgImage } from './../../../store/organization/organization.actions';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  selectedFiles: FileList;
  error = '';
  fileType;
  saving$: Observable<boolean>;

  constructor(
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<CreateMemorialState>
  ) {
    if (data.context === 'create-album') {
      this.saving$ = this.store.pipe(select(getCreatePhotosSaving));
    } else if (data.context === 'org') {
      this.saving$ = this.store.pipe(select(getOrganizationSaving));
    } else {
      this.saving$ = this.store.pipe(select(getCreatedSaving));
    }
  }

  ngOnInit() {}


  onUpload() {
    if (this.data.context === 'memorial') {
      const payload = {
        id: this.data.memorial,
        image: this.selectedFiles[0]
      };
      if (this.data.action === 'upload') {
        this.store.dispatch(new UploadMemorialImage(payload));
      } else if (this.data.action === 'replace') {
        this.store.dispatch(new ReplaceMemorialImage(payload));
      }
    } else if (this.data.context === 'timeline') {
      const payload = {
        id: this.data.timeline,
        file: this.selectedFiles[0],
        asset_type: this.fileType
      };
      if (this.data.action === 'upload') {
        this.store.dispatch(new UploadTimelineFile(payload));
      } else if (this.data.action === 'replace') {
        this.store.dispatch(new ReplaceTimelineFile(payload));
      }
    } else if (this.data.context === 'create-album') {
      const payload = {
        id: this.data.memorial,
        file: this.selectedFiles[0],
      };
      this.store.dispatch(new UploadCreatePhoto(payload));
    } else if (this.data.context === 'org') {
      const payload = {
        id: this.data.organization,
        image: this.selectedFiles[0],
      };
      if (this.data.action === 'upload') {
        this.store.dispatch(new UploadOrgImage(payload));
      } else if (this.data.action === 'replace') {
        this.store.dispatch(new ReplaceOrgImage(payload));
      }
    }
    if (this.data.context === 'create-album') {
      const sub = this.store.pipe(select(getCreatePhotosSaved)).subscribe(res => {
        if (res) {
          this.dialogRef.close();
          sub.unsubscribe();
        }
      });
    } else if (this.data.context === 'org') {
      const sub = this.store.pipe(select(getOrganizationSaved)).subscribe(res => {
        if (res) {
          this.dialogRef.close();
          sub.unsubscribe();
        }
      });
    } else {
      const sub = this.store.pipe(select(getCreatedSaved)).subscribe(res => {
        if (res) {
          this.dialogRef.close();
          sub.unsubscribe();
        }
      });
    }
  }

  onSelectFile(event) {
    if (event.target.files[0].size > 2000000) {
      this.error = 'Your file is too big. It must be less than 2MB';
    } else if (event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
      this.error = 'This file is the wrong type. You may only upload jpeg or png files';
    } else if (event.target.files.length > 1) {
      this.error = 'You may only upload one file at a time';
    } else {
      this.error = '';
      this.selectedFiles = event.target.files;
      if (this.selectedFiles[0].type.includes('image')) {
        this.fileType = 'image';
      }
    }
  }

}
