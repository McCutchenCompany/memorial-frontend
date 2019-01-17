import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CreditCardDirectivesModule } from 'angular-cc-library';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { MemoryEditDialogComponent } from './components/memory-edit-dialog/memory-edit-dialog.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ResponseDialogComponent } from './components/response-dialog/response-dialog.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
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
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    CreditCardDirectivesModule,
    RouterModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    UploadImageComponent,
    ConfirmDialogComponent,
    PaymentComponent,
    FooterComponent,
    MemoryEditDialogComponent
  ],
  declarations: [
    UploadImageComponent,
    UploadDialogComponent,
    ConfirmDialogComponent,
    PrivacyPolicyComponent,
    PaymentComponent,
    OrderDetailsComponent,
    FooterComponent,
    ResponseDialogComponent,
    TermsOfServiceComponent,
    PaymentConfirmationComponent,
    MemoryEditDialogComponent
  ],
  entryComponents: [
    UploadDialogComponent,
    ConfirmDialogComponent,
    PaymentComponent,
    ResponseDialogComponent,
    PaymentConfirmationComponent,
    MemoryEditDialogComponent
  ]
})
export class SharedModule { }
