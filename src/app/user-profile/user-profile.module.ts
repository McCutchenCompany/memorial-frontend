import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { MyMemorialCardComponent } from './components/my-memorial-card/my-memorial-card.component';
import { MyMemorialsComponent } from './components/my-memorials/my-memorials.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [UserProfileComponent, UserInfoComponent, MyMemorialsComponent, MyMemorialCardComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class UserProfileModule { }
