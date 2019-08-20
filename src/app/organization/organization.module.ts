import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { orgMemberReducer } from '@store/organization-members/organization-members.reducer';
import { OrgMembersEffects } from '@store/organization-members/organization-membrs.effects';
import { OrgMemorialEffects } from '@store/organization-memorials/org-memorials.effects';
import { orgMemorialReducer } from '@store/organization-memorials/org-memorials.reducer';
import { OrganizationEffects } from '@store/organization/organization.effects';
import { organizationReducer } from '@store/organization/organization.reducer';
import { ClipboardModule } from 'ngx-clipboard';

import { AddMembersComponent } from './components/add-members/add-members.component';
import { MemorialTableComponent } from './components/memorial-table/memorial-table.component';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';
import { OrganizationHeaderComponent } from './components/organization-header/organization-header.component';
import { CreateOrgComponent } from './containers/create-org/create-org.component';
import { EditOrgComponent } from './containers/edit-org/edit-org.component';
import { JoinOrgComponent } from './containers/join-org/join-org.component';
import { OrganizationShowComponent } from './containers/organization-show/organization-show.component';
import { OrganizationRoutingModule } from './organization-routing.module';

@NgModule({
  declarations: [
    CreateOrgComponent,
    OrganizationShowComponent,
    MemorialTableComponent,
    OrganizationHeaderComponent,
    OrganizationDetailsComponent,
    AddMembersComponent,
    EditOrgComponent,
    JoinOrgComponent
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
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTabsModule,
    SharedModule,
    RouterModule,
    ClipboardModule,
    StoreModule.forFeature('organization', organizationReducer),
    StoreModule.forFeature('org-memorials', orgMemorialReducer),
    StoreModule.forFeature('org-members', orgMemberReducer),
    EffectsModule.forFeature([
      OrganizationEffects,
      OrgMemorialEffects,
      OrgMembersEffects
    ])
  ]
})
export class OrganizationModule { }
