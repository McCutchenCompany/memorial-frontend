import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '@environments/environment';

import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ImageUploadService } from './../../../shared/services/image-upload.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input() image: string;
  @Input() memorial_id: string;
  @Output() remove: EventEmitter<{memorial_id: string, route: string}> = new EventEmitter<{memorial_id: string, route: string}>();

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
    private dialog: MatDialog,
    private uploadService: ImageUploadService
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
        this.remove.emit({memorial_id: this.memorial_id, route: this.image});
      }
    });
  }

}
