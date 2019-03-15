import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { fileTypeValidator } from '@shared/validators/file-type.validator';
import { fileSizeValidator } from '@shared/validators/files-size.validator';
import { UploadAlbumPhoto } from '@store/album/album.actions';
import { getAlbumSaved } from '@store/album/album.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album-uploader',
  templateUrl: './album-uploader.component.html',
  styleUrls: ['./album-uploader.component.scss']
})
export class AlbumUploaderComponent implements OnInit {

  selectedFiles: FileList;
  error = '';
  fileType;
  saving$: Observable<boolean>;
  filesForm: FormArray;

  uploading = false;

  constructor(
    private dialogRef: MatDialogRef<AlbumUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<any>,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.dialogRef.backdropClick().subscribe(() => {
      this.onClose();
    });
  }

  buildForm() {
    this.filesForm = this.fb.array([]);
  }

  onClose() {
    if (!this.uploading) {
      this.dialogRef.close();
    }
  }


  onUpload() {
    this.uploading = !this.uploading;
    const length = this.filesForm.value.length;
    let index = 0;

    this.uploadFile(this.filesForm.controls[index].value.file);
    this.filesForm.controls[index].patchValue({uploading: true});

    const sub = this.store.pipe(select(getAlbumSaved)).subscribe(saved => {
      if (saved) {
        this.filesForm.controls[index].patchValue({uploading: false, uploaded: true});
        if (index + 1 < length) {
          index += 1;
          this.uploadFile(this.filesForm.controls[index].value.file);
          this.filesForm.controls[index].patchValue({uploading: true});
        } else {
          sub.unsubscribe();
          this.uploading = false;
          this.dialogRef.close(true)
        }
      }
    });
  }

  uploadFile(file) {
    const payload = {
      id: this.data.memorial,
      file: file
    };
    this.store.dispatch(new UploadAlbumPhoto(payload));
  }

  onSelectFile(event) {
    const array = Array.from(event.target.files);
    array.forEach(file => {
      if (file instanceof File) {
        const control = this.fb.group({
          file: [file, [fileSizeValidator, fileTypeValidator]],
          uploading: false,
          uploaded: false
        });
        this.filesForm.push(control);
      }
    });
    this.selectedFiles = event.target.files;
  }

  remove(index) {
    this.filesForm.removeAt(index);
  }

  getTooltip(group: FormGroup) {
    if (group.controls.file.errors) {
      const error = group.controls.file.errors;
      if (error['badType']) {
        return 'This file is the wrong type. You may only upload jpeg or png files';
      } else if (error['tooBig']) {
        return 'Your file is too big. It must be less than 2MB';
      }
    } else {
      if (group.value.uploading) {
        return `...Uploading ${group.value.file.name}`;
      } else if (group.value.uploaded) {
        return `File Uploaded!`;
      } else {
        return '';
      }
    }
  }

}
