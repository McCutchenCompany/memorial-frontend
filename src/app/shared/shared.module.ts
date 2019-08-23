import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { MemberTableComponent } from '@shared/components/member-table/member-table.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { FileSaverModule } from 'ngx-filesaver';

import { AlbumUploaderComponent } from './components/album-uploader/album-uploader.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CreateMemorialOptionsComponent } from './components/create-memorial-options/create-memorial-options.component';
import { CreditCardDetailsComponent } from './components/credit-card-details/credit-card-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImageEditorComponent } from './components/image-editor/image-editor.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { MemorialResultCardComponent } from './components/memorial-result-card/memorial-result-card.component';
import { MemoryEditDialogComponent } from './components/memory-edit-dialog/memory-edit-dialog.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PhotoAlbumShowComponent } from './components/photo-album-show/photo-album-show.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ResponseDialogComponent } from './components/response-dialog/response-dialog.component';
import { RibbonBoardComponent } from './components/ribbon-board/ribbon-board.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { UnlockOverlayComponent } from './components/unlock-overlay/unlock-overlay.component';
import { UnlockPurchaseComponent } from './components/unlock-purchase/unlock-purchase.component';
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
    MatDividerModule,
    MatRippleModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTooltipModule,
    MatSliderModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    CreditCardDirectivesModule,
    RouterModule,
    FileSaverModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    UploadImageComponent,
    ConfirmDialogComponent,
    PaymentComponent,
    FooterComponent,
    MemoryEditDialogComponent,
    MemorialResultCardComponent,
    UnlockOverlayComponent,
    ImageEditorComponent,
    ImageViewerComponent,
    CreateMemorialOptionsComponent,
    MemberTableComponent,
    CreditCardDetailsComponent,
    UnlockPurchaseComponent,
    RibbonBoardComponent
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
    MemoryEditDialogComponent,
    MemorialResultCardComponent,
    PhotoAlbumShowComponent,
    AlbumUploaderComponent,
    UnlockOverlayComponent,
    ImageEditorComponent,
    ImageViewerComponent,
    CreateMemorialOptionsComponent,
    MemberTableComponent,
    CreditCardDetailsComponent,
    UnlockPurchaseComponent,
    RibbonBoardComponent
  ],
  entryComponents: [
    UploadDialogComponent,
    ConfirmDialogComponent,
    PaymentComponent,
    ResponseDialogComponent,
    PaymentConfirmationComponent,
    MemoryEditDialogComponent,
    PhotoAlbumShowComponent,
    AlbumUploaderComponent,
    ImageEditorComponent,
    CreateMemorialOptionsComponent,
    UnlockPurchaseComponent
  ]
})
export class SharedModule { }
