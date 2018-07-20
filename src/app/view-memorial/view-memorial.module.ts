import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '../../../node_modules/@ngrx/store';
import * as fromStore from '../store/view-memorial';
import { ViewMemorialComponent } from './components/view-memorial/view-memorial.component';
import { ViewMemorialRoutingModule } from './view-memorial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('viewMemorial', fromStore.viewMemorialReducer),
    EffectsModule.forFeature([]),
    ViewMemorialRoutingModule
  ],
  declarations: [ViewMemorialComponent]
})
export class ViewMemorialModule { }
