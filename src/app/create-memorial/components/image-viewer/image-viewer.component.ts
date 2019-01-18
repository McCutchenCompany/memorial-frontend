import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
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
      return {
        background: `url(${environment.s3.url}${this.image})`,
        position: 'center',
        repeat: 'no-repeat',
        size: 'cover'
      };
    } else {
      return {
        background: 'url(assets/imgs/default-memorial.jpg)',
        position: 'center',
        repeat: 'no-repeat',
        size: 'cover'
      };
    }
  }

  constructor(
    private dialog: MatDialog
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
