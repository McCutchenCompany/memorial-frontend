import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '../../../node_modules/@ngrx/store';
import * as fromStore from '../store/find-memorial';
import { FindMemorialComponent } from './components/find-memorial/find-memorial.component';
import { FindMemorialRoutingModule } from './find-memorial-routing.module';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE'
    }),
    AgmJsMarkerClustererModule,
    CommonModule,
    FindMemorialRoutingModule,
    StoreModule.forFeature('findMemorial', fromStore.findMemorialReducer),
    EffectsModule.forFeature([])
  ],
  declarations: [FindMemorialComponent]
})
export class FindMemorialModule { }
