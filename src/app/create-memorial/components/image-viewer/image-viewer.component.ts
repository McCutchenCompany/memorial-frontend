import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { UploadDialogComponent } from '@shared/components/upload-dialog/upload-dialog.component';
import { ImageFormat } from '@store/models/image-format.model';

import { ImageEditorComponent } from '../image-editor/image-editor.component';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input() image: string;
  @Input() id: string;
  @Input() type: 'memorial' | 'timeline';
  @Input() format: ImageFormat;
  @Output() remove: EventEmitter<{id: string, route: string}> = new EventEmitter<{id: string, route: string}>();

  get imgBackground() {
    if (this.image) {
      const height = this.format.rot === 90 || this.format.rot === 270 ? '20' : '10.5';
      return {
        background: `url(${environment.s3.url}${this.image})`,
        repeat: 'no-repeat',
        position: `${this.format.posX.toString()}px ${this.format.posY.toString()}px`,
        size: `cover`,
        scale: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.format.scale / 100}) rotate(${this.format.rot}deg)`),
        height: `${height}rem`
      };
    } else {
      return {
        background: 'url(https://s3.amazonaws.com/memorial-staging-imgs/assets/default-memorial.jpeg)',
        position: 'center',
        repeat: 'no-repeat',
        size: 'cover'
      };
    }
  }

  constructor(
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  onRemove() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'delete this image?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove.emit({id: this.id, route: this.image});
      }
    });
  }

  onReplace() {
    if (this.type === 'memorial') {
      this.dialog.open(UploadDialogComponent, {
        data: {
          memorial: this.id,
          action: 'replace'
        }
      });
    } else if (this.type === 'timeline') {
      this.dialog.open(UploadDialogComponent, {
        data: {
          timeline: this.id,
          action: 'replace'
        }
      });
    }
  }

  onEdit() {
    this.dialog.open(ImageEditorComponent, {
      data: {
        id: this.id,
        type: this.type,
        image: this.image,
        format: this.format
      }
    });
  }

}
