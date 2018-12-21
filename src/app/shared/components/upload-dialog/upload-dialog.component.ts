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
    this.selectedFiles = event.target.files;
  }

}
