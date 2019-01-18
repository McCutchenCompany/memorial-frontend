import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { UpdateCreateMemorial, UpdateSingleTimeline } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { ImageFormat } from '@store/models/image-format.model';

import { getCreatedSaved } from './../../../store/create-memorial/create-memorial.reducer';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit {

  imageFormat: FormGroup;

  rotations = [0, 90, 180, 270];

  get imgBackground() {
    const height = this.imageFormat.value.rot === 90 || this.imageFormat.value.rot === 270 ? '20' : '10.5';
    return {
      background: `url(${environment.s3.url}${this.data.image})`,
      repeat: 'no-repeat',
      position: `${this.imageFormat.value.posX.toString()}px ${this.imageFormat.value.posY.toString()}px`,
      size: `cover`,
      scale: this.sanitizer.bypassSecurityTrustStyle(
        `scale(${this.imageFormat.value.scale / 100}) rotate(${this.imageFormat.value.rot}deg)`),
      height: `${height}rem`
    };
  }

  constructor(
    public dialogRef: MatDialogRef<ImageEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, type: string, image: string, format: ImageFormat},
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private store: Store<CreateMemorialState>
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.imageFormat = this.fb.group({
      posY: this.data.format.posY ? this.data.format.posY : 0,
      posX: this.data.format.posX ? this.data.format.posX : 0,
      scale: this.data.format.scale ? this.data.format.scale : 100,
      rot: this.data.format.rot ? this.data.format.rot : 0
    });
  }

  recenter() {
    this.imageFormat.patchValue({posY: 0, posX: 0});
  }

  onDrag(event) {
    if (event.pressure > 0) {
      switch (this.imageFormat.value.rot) {
        case 0: {
          if (event.movementX > 0 || event.movementX < 0) {
            this.imageFormat.patchValue({posX: this.imageFormat.value.posX + ((event.movementX))});
          }
          if (event.movementY > 0 || event.movementY < 0) {
            this.imageFormat.patchValue({posY: this.imageFormat.value.posY + ((event.movementY))});
          }
          break;
        }
        case 90: {
          if (event.movementX > 0 || event.movementX < 0) {
            this.imageFormat.patchValue({posY: this.imageFormat.value.posY - ((event.movementX))});
          }
          if (event.movementY > 0 || event.movementY < 0) {
            this.imageFormat.patchValue({posX: this.imageFormat.value.posX + ((event.movementY))});
          }
          break;
        }
        case 180: {
          if (event.movementX > 0 || event.movementX < 0) {
            this.imageFormat.patchValue({posX: this.imageFormat.value.posX - ((event.movementX))});
          }
          if (event.movementY > 0 || event.movementY < 0) {
            this.imageFormat.patchValue({posY: this.imageFormat.value.posY - ((event.movementY))});
          }
          break;
        }
        case 270: {
          if (event.movementX > 0 || event.movementX < 0) {
            this.imageFormat.patchValue({posY: this.imageFormat.value.posY + ((event.movementX))});
          }
          if (event.movementY > 0 || event.movementY < 0) {
            this.imageFormat.patchValue({posX: this.imageFormat.value.posX - ((event.movementY))});
          }
          break;
        }
        default: break;
      }
    }
  }

  onRotate(dir: ('left' | 'right')) {
    const index = this.rotations.indexOf(this.imageFormat.value.rot);
    if (dir === 'left' && index > 0) {
      this.imageFormat.patchValue({rot: this.rotations[index - 1]});
    } else if (dir === 'left' && index === 0) {
      this.imageFormat.patchValue({rot: this.rotations[3]});
    } else if (dir === 'right' && index < this.rotations.length - 1) {
      this.imageFormat.patchValue({rot: this.rotations[index + 1]});
    } else {
      this.imageFormat.patchValue({rot: this.rotations[0]});
    }
  }

  onSave() {
    if (this.data.type === 'memorial') {
      const payload = {
        uuid: this.data.id,
        body: this.imageFormat.value
      };
      this.store.dispatch(new UpdateCreateMemorial(payload));
    } else if (this.data.type === 'timeline') {
      const payload = {
        timeline_id: this.data.id,
        body: this.imageFormat.value
      };
      this.store.dispatch(new UpdateSingleTimeline(payload));
    }
    const sub = this.store.pipe(select(getCreatedSaved)).subscribe(res => {
      if (res) {
        this.dialogRef.close();
        sub.unsubscribe();
      }
    });
  }

}
