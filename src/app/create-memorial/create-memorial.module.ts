import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
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
import { AddLocationComponent } from './components/add-location/add-location.component';
import { ApprovalCardComponent } from './components/approval-card/approval-card.component';
import { ApproveMemoriesComponent } from './components/approve-memories/approve-memories.component';
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
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('createMemorial', fromStore.createMemorialReducer),
    EffectsModule.forFeature([
      CreateMemorialEffects
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE',
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule
  ],
  declarations: [
    CreateMemorialComponent,
    MemorialInfoComponent,
    ImageViewerComponent,
    CreateTimelineComponent,
    TimelineFormComponent,
    AddLocationComponent,
    ApproveMemoriesComponent,
    ApprovalCardComponent
  ]
})
export class CreateMemorialModule { }
