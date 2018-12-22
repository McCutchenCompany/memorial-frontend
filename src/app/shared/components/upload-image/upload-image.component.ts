import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Input() memorialId: string;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onOpenDialog() {
    this.dialog.open(UploadDialogComponent, {
      data: {
        memorial: this.memorialId,
        action: 'upload'
      }
    });
  }

}
