import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { albumReducer } from '@store/album/album.reducer';

import { StoreModule } from '../../../node_modules/@ngrx/store';
import * as fromStore from '../store/view-memorial';
import { AlbumEffects } from './../store/album/album.effects';
import { ViewMemorialEffects } from './../store/view-memorial/view-memorial.effect';
import { InteractiveTimelineComponent } from './components/interactive-timeline/interactive-timeline.component';
import { MemorialAlbumComponent } from './components/memorial-album/memorial-album.component';
import { MemorialHeaderComponent } from './components/memorial-header/memorial-header.component';
import { MemorialInfoComponent } from './components/memorial-info/memorial-info.component';
import { MemorialLocationComponent } from './components/memorial-location/memorial-location.component';
import { MemorialMemoriesComponent } from './components/memorial-memories/memorial-memories.component';
import { MemorialTimelineComponent } from './components/memorial-timeline/memorial-timeline.component';
import { MemoryCardComponent } from './components/memory-card/memory-card.component';
import { ViewMemorialComponent } from './containers/view-memorial/view-memorial.component';
import { ViewMemorialRoutingModule } from './view-memorial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE'
    }),
    AgmJsMarkerClustererModule,
    StoreModule.forFeature('viewMemorial', fromStore.viewMemorialReducer),
    StoreModule.forFeature('album', albumReducer),
    EffectsModule.forFeature([
      ViewMemorialEffects,
      AlbumEffects
    ]),
    ViewMemorialRoutingModule
  ],
  declarations: [
    ViewMemorialComponent,
    MemorialHeaderComponent,
    MemorialInfoComponent,
    MemorialTimelineComponent,
    MemorialLocationComponent,
    InteractiveTimelineComponent,
    MemorialMemoriesComponent,
    MemoryCardComponent,
    MemorialAlbumComponent
  ]
})
export class ViewMemorialModule { }
