import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateMemorialComponent } from './containers/create-memorial/create-memorial.component';

const createMemorialRoutes: Routes = [
  { path: '', component: CreateMemorialComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(createMemorialRoutes)
  ],
  exports: [RouterModule]
})
export class CreateMemorialRoutingModule { }
