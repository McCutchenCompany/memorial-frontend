import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FindMemorialComponent } from './components/find-memorial/find-memorial.component';

const findMemorialRoutes: Routes = [
  { path: '', component: FindMemorialComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(findMemorialRoutes)
  ],
  exports: [RouterModule]
})
export class FindMemorialRoutingModule { }
