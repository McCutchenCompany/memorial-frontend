import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatTabsModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import * as fromStore from '../store/create-memorial';
import { CreateMemorialEffects } from './../store/create-memorial/create-memorial.effects';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { MemorialInfoComponent } from './components/memorial-info/memorial-info.component';
import { CreateMemorialComponent } from './containers/create-memorial/create-memorial.component';
import { CreateMemorialRoutingModule } from './create-memorial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CreateMemorialRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('createMemorial', fromStore.createMemorialReducer),
    EffectsModule.forFeature([
      CreateMemorialEffects
    ])
  ],
  declarations: [CreateMemorialComponent, MemorialInfoComponent, ImageViewerComponent]
})
export class CreateMemorialModule { }
