import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageUploadService } from '@shared/services/image-upload.service';

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
    private uploadService: ImageUploadService
  ) { }

  ngOnInit() {
  }


  onUpload() {
    this.uploadService.uploadImage(this.dialogRef, this.data.memorial, this.selectedFiles[0]);
  }

  onSelectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
