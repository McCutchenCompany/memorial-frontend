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
  MatSelectModule,
  MatTabsModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import * as fromStore from '../store/create-memorial';
import { CreateMemorialEffects } from './../store/create-memorial/create-memorial.effects';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { MemorialInfoComponent } from './components/memorial-info/memorial-info.component';
import { TimelineFormComponent } from './components/timeline-form/timeline-form.component';
import { CreateMemorialComponent } from './containers/create-memorial/create-memorial.component';
import { CreateTimelineComponent } from './containers/create-timeline/create-timeline.component';
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
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('createMemorial', fromStore.createMemorialReducer),
    EffectsModule.forFeature([
      CreateMemorialEffects
    ])
  ],
  declarations: [CreateMemorialComponent, MemorialInfoComponent, ImageViewerComponent, CreateTimelineComponent, TimelineFormComponent]
})
export class CreateMemorialModule { }
