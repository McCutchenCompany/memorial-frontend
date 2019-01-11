import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog(type: string) {
    this.dialog.open(ResponseDialogComponent, {
      data: {
        type: type
      }
    });
  }

}
