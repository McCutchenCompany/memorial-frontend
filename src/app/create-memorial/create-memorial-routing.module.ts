import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveMemoriesComponent } from 'app/create-memorial/components/approve-memories/approve-memories.component';

import { AddLocationComponent } from './components/add-location/add-location.component';
import { MemorialInfoComponent } from './components/memorial-info/memorial-info.component';
import { CreateMemorialComponent } from './containers/create-memorial/create-memorial.component';
import { CreateTimelineComponent } from './containers/create-timeline/create-timeline.component';

const createMemorialRoutes: Routes = [
  { path: ':id', component: CreateMemorialComponent, children: [
    { path: '', component: MemorialInfoComponent },
    { path: 'timeline', component: CreateTimelineComponent },
    { path: 'location', component: AddLocationComponent },
    { path: 'memories', component: ApproveMemoriesComponent }
  ]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(createMemorialRoutes)
  ],
  exports: [RouterModule]
})
export class CreateMemorialRoutingModule { }
