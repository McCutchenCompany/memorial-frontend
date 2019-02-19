import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewMemorialComponent } from './containers/view-memorial/view-memorial.component';

const viewMemorialRoutes: Routes = [
  { path: ':id', component: ViewMemorialComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(viewMemorialRoutes)
  ],
  exports: [RouterModule]
})
export class ViewMemorialRoutingModule { }
