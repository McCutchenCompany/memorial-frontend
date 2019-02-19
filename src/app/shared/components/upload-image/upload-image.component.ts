import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Input() id: string;
  @Input() type: 'memorial' | 'timeline';

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onOpenDialog() {
    if (this.type === 'memorial') {
      this.dialog.open(UploadDialogComponent, {
        data: {
          memorial: this.id,
          action: 'upload'
        }
      });
    } else if (this.type === 'timeline') {
      this.dialog.open(UploadDialogComponent, {
        data: {
          timeline: this.id,
          action: 'upload'
        },
        closeOnNavigation: false
      });
    }
  }

}
