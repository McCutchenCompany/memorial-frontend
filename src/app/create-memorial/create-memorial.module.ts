import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { CreatePhotosEffects } from '@store/create-photos/photos.effects';
import { createPhotoReducer } from '@store/create-photos/reducers';
import { ClipboardModule } from 'ngx-clipboard';

import * as fromStore from '../store/create-memorial';
import { CreateMemorialEffects } from './../store/create-memorial/create-memorial.effects';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AlbumViewerComponent } from './components/album-viewer/album-viewer.component';
import { ApprovalCardComponent } from './components/approval-card/approval-card.component';
import { ApproveMemoriesComponent } from './components/approve-memories/approve-memories.component';
import { ApprovePhotosComponent } from './components/approve-photos/approve-photos.component';
import { MemorialInfoComponent } from './components/memorial-info/memorial-info.component';
import { MemorialShareComponent } from './components/memorial-share/memorial-share.component';
import { TimelineFormComponent } from './components/timeline-form/timeline-form.component';
import { CreateMemorialComponent } from './containers/create-memorial/create-memorial.component';
import { CreateNavComponent } from './containers/create-nav/create-nav.component';
import { CreateTimelineComponent } from './containers/create-timeline/create-timeline.component';
import { CreateMemorialRoutingModule } from './create-memorial-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    CreateMemorialRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatSliderModule,
    MatSidenavModule,
    MatDividerModule,
    MatExpansionModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('createMemorial', fromStore.createMemorialReducer),
    StoreModule.forFeature('createPhotos', createPhotoReducer),
    EffectsModule.forFeature([
      CreateMemorialEffects,
      CreatePhotosEffects
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
    CreateTimelineComponent,
    TimelineFormComponent,
    AddLocationComponent,
    ApproveMemoriesComponent,
    ApprovalCardComponent,
    CreateNavComponent,
    ApprovePhotosComponent,
    AlbumViewerComponent,
    MemorialShareComponent
  ]
})
export class CreateMemorialModule { }
