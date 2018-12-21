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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserProfileEffects } from '@store/user-profile/user-profile.effects';
import { userProfileReducer } from '@store/user-profile/user-profile.reducer';

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
    ReactiveFormsModule,
    StoreModule.forFeature('userProfile', userProfileReducer),
    EffectsModule.forFeature([
      UserProfileEffects
    ])
  ]
})
export class UserProfileModule { }
