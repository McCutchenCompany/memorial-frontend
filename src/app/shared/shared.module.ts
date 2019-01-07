import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    UploadImageComponent,
    ConfirmDialogComponent,
    PaymentComponent
  ],
  declarations: [UploadImageComponent, UploadDialogComponent, ConfirmDialogComponent, PrivacyPolicyComponent, PaymentComponent],
  entryComponents: [
    UploadDialogComponent,
    ConfirmDialogComponent,
    PaymentComponent
  ]
})
export class SharedModule { }
