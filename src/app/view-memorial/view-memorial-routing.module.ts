import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditLinkComponent } from './containers/edit-link/edit-link.component';
import { ViewMemorialComponent } from './containers/view-memorial/view-memorial.component';

const viewMemorialRoutes: Routes = [
  { path: ':id', component: ViewMemorialComponent },
  { path: 'edit/:id', component: EditLinkComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(viewMemorialRoutes)
  ],
  exports: [RouterModule]
})
export class ViewMemorialRoutingModule { }
