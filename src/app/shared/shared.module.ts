import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    UploadImageComponent,
    ConfirmDialogComponent
  ],
  declarations: [UploadImageComponent, UploadDialogComponent, ConfirmDialogComponent],
  entryComponents: [
    UploadDialogComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
