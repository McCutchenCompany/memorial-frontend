import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromStore from '../store/create-memorial';
import { CreateMemorialEffects } from './../store/create-memorial/create-memorial.effects';
import { MemorialInfoComponent } from './components/memorial-info/memorial-info.component';
import { CreateMemorialComponent } from './containers/create-memorial/create-memorial.component';
import { CreateMemorialRoutingModule } from './create-memorial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CreateMemorialRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    StoreModule.forFeature('createMemorial', fromStore.createMemorialReducer),
    EffectsModule.forFeature([
      CreateMemorialEffects
    ])
  ],
  declarations: [CreateMemorialComponent, MemorialInfoComponent]
})
export class CreateMemorialModule { }
