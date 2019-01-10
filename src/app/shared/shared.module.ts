import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
} from '@angular/material';
import { CreditCardDirectivesModule } from 'angular-cc-library';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
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
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CreditCardDirectivesModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    UploadImageComponent,
    ConfirmDialogComponent,
    PaymentComponent
  ],
  declarations: [
    UploadImageComponent,
    UploadDialogComponent,
    ConfirmDialogComponent,
    PrivacyPolicyComponent,
    PaymentComponent,
    OrderDetailsComponent
  ],
  entryComponents: [
    UploadDialogComponent,
    ConfirmDialogComponent,
    PaymentComponent
  ]
})
export class SharedModule { }
