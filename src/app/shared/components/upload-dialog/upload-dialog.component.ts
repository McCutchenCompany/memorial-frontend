import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { getCreatedSaved } from '@store/create-memorial';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';

import {
  ReplaceMemorialImage,
  UploadMemorialImage,
  UploadTimelineFile,
} from './../../../store/create-memorial/create-memorial.actions';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  selectedFiles: FileList;
  error = '';
  fileType;

  constructor(
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<CreateMemorialState>
  ) { }

  ngOnInit() {}


  onUpload() {
    if (this.data.memorial) {
      const payload = {
        id: this.data.memorial,
        image: this.selectedFiles[0]
      };
      if (this.data.action === 'upload') {
        this.store.dispatch(new UploadMemorialImage(payload));
      } else if (this.data.action === 'replace') {
        this.store.dispatch(new ReplaceMemorialImage(payload));
      }
    } else if (this.data.timeline) {
      const payload = {
        id: this.data.timeline,
        file: this.selectedFiles[0],
        asset_type: this.fileType
      };
      if (this.data.action === 'upload') {
        this.store.dispatch(new UploadTimelineFile(payload));
      } else if (this.data.action === 'replace') {
        // this.store.dispatch(new ReplaceMemorialImage(payload));
      }
    }
    const sub = this.store.pipe(select(getCreatedSaved)).subscribe(res => {
      if (res) {
        this.dialogRef.close();
        sub.unsubscribe();
      }
    });
  }

  onSelectFile(event) {
    if (event.target.files[0].size > 512000) {
      this.error = 'Your file is too big. It must be less than 500kb';
    } else if (event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
      this.error = 'This file is the wrong type. You may only upload jpeg or png files';
    } else {
      this.error = '';
      this.selectedFiles = event.target.files;
      if (this.selectedFiles[0].type.includes('image')) {
        this.fileType = 'image';
      }
    }
  }

}
