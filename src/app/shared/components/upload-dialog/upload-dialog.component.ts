import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { ImageUploadService } from '@shared/services/image-upload.service';
import { getCreatedSaved } from '@store/create-memorial';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';

import { UploadMemorialImage } from './../../../store/create-memorial/create-memorial.actions';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  selectedFiles: FileList;
  error = '';

  constructor(
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadService: ImageUploadService,
    private store: Store<CreateMemorialState>
  ) { }

  ngOnInit() {
  }


  onUpload() {
    const payload = {
      id: this.data.memorial,
      image: this.selectedFiles[0]
    };
    this.store.dispatch(new UploadMemorialImage(payload));
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
    }
  }

}
