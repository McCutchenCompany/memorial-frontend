import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './../shared/services/auth-guard.service';
import { CreateOrgComponent } from './containers/create-org/create-org.component';
import { EditOrgComponent } from './containers/edit-org/edit-org.component';
import { OrganizationShowComponent } from './containers/organization-show/organization-show.component';

const routes: Routes = [
  { path: 'create-org', component: CreateOrgComponent, canActivate: [AuthGuardService] },
  { path: ':id', component: OrganizationShowComponent, canActivate: [AuthGuardService] },
  { path: ':id/edit', component: EditOrgComponent, canActivate: [AuthGuardService ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
