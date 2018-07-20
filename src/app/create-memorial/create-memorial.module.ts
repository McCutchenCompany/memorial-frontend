import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromStore from '../store/create-memorial';
import { CreateMemorialComponent } from './components/create-memorial/create-memorial.component';
import { CreateMemorialRoutingModule } from './create-memorial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CreateMemorialRoutingModule,
    StoreModule.forFeature('createMemorial', fromStore.createMemorialReducer),
    EffectsModule.forFeature([])
  ],
  declarations: [CreateMemorialComponent]
})
export class CreateMemorialModule { }
