import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '../../../node_modules/@ngrx/store';
import * as fromStore from '../store/view-memorial';
import { ViewMemorialEffects } from './../store/view-memorial/view-memorial.effect';
import { MemorialHeaderComponent } from './components/memorial-header/memorial-header.component';
import { MemorialInfoComponent } from './components/memorial-info/memorial-info.component';
import { MemorialLocationComponent } from './components/memorial-location/memorial-location.component';
import { MemorialTimelineComponent } from './components/memorial-timeline/memorial-timeline.component';
import { ViewMemorialComponent } from './containers/view-memorial/view-memorial.component';
import { ViewMemorialRoutingModule } from './view-memorial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE'
    }),
    AgmJsMarkerClustererModule,
    StoreModule.forFeature('viewMemorial', fromStore.viewMemorialReducer),
    EffectsModule.forFeature([
      ViewMemorialEffects
    ]),
    ViewMemorialRoutingModule
  ],
  declarations: [
    ViewMemorialComponent,
    MemorialHeaderComponent,
    MemorialInfoComponent,
    MemorialTimelineComponent,
    MemorialLocationComponent
  ]
})
export class ViewMemorialModule { }
