import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ImageEditorComponent } from '@shared/components/image-editor/image-editor.component';
import { UploadDialogComponent } from '@shared/components/upload-dialog/upload-dialog.component';
import { ImageFormat } from '@store/models/image-format.model';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input() image: string;
  @Input() id: string;
  @Input() type: 'memorial' | 'timeline' | 'org';
  @Input() format: ImageFormat;
  @Output() remove: EventEmitter<{id: string, route: string}> = new EventEmitter<{id: string, route: string}>();

  get imgFormat() {
    if (this.image) {
      return {
        src: `${environment.s3.url}${this.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.format.scale / 100})
          rotate(${this.format.rot}deg)
          translate(${this.format.posX.toString()}px, ${this.format.posY.toString()}px)`),
      };
    } else {
      return {
        src: 'assets/imgs/default-memorial.jpeg',
        transform: ''
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
          context: 'memorial',
          memorial: this.id,
          action: 'replace'
        }
      });
    } else if (this.type === 'org') {
      this.dialog.open(UploadDialogComponent, {
        data: {
          context: 'org',
          organization: this.id,
          action: 'replace'
        }
      });
    } else if (this.type === 'timeline') {
      this.dialog.open(UploadDialogComponent, {
        data: {
          context: 'timeline',
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
