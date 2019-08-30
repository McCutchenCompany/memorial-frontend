import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { CreatePhotosEffects } from '@store/create-photos/photos.effects';
import { createPhotoReducer } from '@store/create-photos/reducers';
import { EditMilitaryEffects } from '@store/edit-military/edit-military.effects';
import { editMilitaryReducer } from '@store/edit-military/edit-military.reducer';
import { MemorialMembersEffects } from '@store/memorial-members/memorial-members.effects';
import { MemorialMemberReducer } from '@store/memorial-members/memorial-members.reducer';
import { MilitaryHistoryEffects } from '@store/military-history/military-history.effects';
import { militaryHistoryReducer } from '@store/military-history/military-history.reducer';
import { ClipboardModule } from 'ngx-clipboard';

import * as fromStore from '../store/create-memorial';
import { CreateMemorialEffects } from './../store/create-memorial/create-memorial.effects';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AlbumViewerComponent } from './components/album-viewer/album-viewer.component';
import { ApprovalCardComponent } from './components/approval-card/approval-card.component';
import { ApproveMemoriesComponent } from './components/approve-memories/approve-memories.component';
import { ApprovePhotosComponent } from './components/approve-photos/approve-photos.component';
import { EditMilitaryComponent } from './components/edit-military/edit-military.component';
import { MedalPickerComponent } from './components/medal-picker/medal-picker.component';
import { MemorialInfoComponent } from './components/memorial-info/memorial-info.component';
import { MemorialShareComponent } from './components/memorial-share/memorial-share.component';
import { MilitaryDetailsComponent } from './components/military-details/military-details.component';
import { RankPickerComponent } from './components/rank-picker/rank-picker.component';
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
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
    FormsModule,
    SharedModule,
    StoreModule.forFeature('createMemorial', fromStore.createMemorialReducer),
    StoreModule.forFeature('createPhotos', createPhotoReducer),
    StoreModule.forFeature('memorial-members', MemorialMemberReducer),
    StoreModule.forFeature('editMilitary', editMilitaryReducer),
    StoreModule.forFeature('militaryHistory', militaryHistoryReducer),
    EffectsModule.forFeature([
      CreateMemorialEffects,
      CreatePhotosEffects,
      MemorialMembersEffects,
      EditMilitaryEffects,
      MilitaryHistoryEffects
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
    MemorialShareComponent,
    EditMilitaryComponent,
    MedalPickerComponent,
    MilitaryDetailsComponent,
    RankPickerComponent
  ]
})
export class CreateMemorialModule { }
