import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '../../../node_modules/@ngrx/store';
import { FindMemorialsEffects } from './../store/find-memorial/effects/find-memorials.effects';
import { findMemorialReducer } from './../store/find-memorial/reducers';
import { FindMemorialComponent } from './components/find-memorial/find-memorial.component';
import { MemorialResultCardComponent } from './components/memorial-result-card/memorial-result-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FindMemorialRoutingModule } from './find-memorial-routing.module';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE'
    }),
    AgmJsMarkerClustererModule,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    FindMemorialRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('find-memorial', findMemorialReducer),
    EffectsModule.forFeature([
      FindMemorialsEffects
    ])
  ],
  declarations: [FindMemorialComponent, SearchBarComponent, MemorialResultCardComponent]
})
export class FindMemorialModule { }
