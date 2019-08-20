import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-create-memorial-options',
  templateUrl: './create-memorial-options.component.html',
  styleUrls: ['./create-memorial-options.component.scss']
})
export class CreateMemorialOptionsComponent implements OnInit {

  get price() {
    return environment.price;
  }

  constructor(
    private dialogRef: MatDialogRef<CreateMemorialOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onFree() {
    this.dialogRef.close({free: true});
  }

  onFull() {
    this.dialogRef.close({free: false});
  }

}
