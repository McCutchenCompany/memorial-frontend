import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrgMemorialEffects } from '@store/organization-memorials/org-memorials.effects';
import { orgMemorialReducer } from '@store/organization-memorials/org-memorials.reducer';
import { OrganizationEffects } from '@store/organization/organization.effects';
import { organizationReducer } from '@store/organization/organization.reducer';

import { AddMembersComponent } from './components/add-members/add-members.component';
import { MemorialTableComponent } from './components/memorial-table/memorial-table.component';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';
import { OrganizationHeaderComponent } from './components/organization-header/organization-header.component';
import { CreateOrgComponent } from './containers/create-org/create-org.component';
import { OrganizationShowComponent } from './containers/organization-show/organization-show.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { EditOrgComponent } from './containers/edit-org/edit-org.component';

@NgModule({
  declarations: [
    CreateOrgComponent,
    OrganizationShowComponent,
    MemorialTableComponent,
    OrganizationHeaderComponent,
    OrganizationDetailsComponent,
    AddMembersComponent,
    EditOrgComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
    StoreModule.forFeature('organization', organizationReducer),
    StoreModule.forFeature('org-memorials', orgMemorialReducer),
    EffectsModule.forFeature([
      OrganizationEffects,
      OrgMemorialEffects
    ])
  ]
})
export class OrganizationModule { }
