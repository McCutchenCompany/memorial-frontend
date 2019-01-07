import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { UserProfileEffects } from '@store/user-profile/user-profile.effects';
import { userProfileReducer } from '@store/user-profile/user-profile.reducer';

import { MyMemorialCardComponent } from './components/my-memorial-card/my-memorial-card.component';
import { MyMemorialsComponent } from './components/my-memorials/my-memorials.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserInfoComponent,
    MyMemorialsComponent,
    MyMemorialCardComponent,
    WelcomeComponent,
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('userProfile', userProfileReducer),
    EffectsModule.forFeature([
      UserProfileEffects
    ])
  ]
})
export class UserProfileModule { }
