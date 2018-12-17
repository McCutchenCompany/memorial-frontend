import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [UserProfileComponent, UserInfoComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class UserProfileModule { }
