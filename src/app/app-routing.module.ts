import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from '@shared/components/callback/callback.component';
import { PrivacyPolicyComponent } from '@shared/components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '@shared/components/terms-of-service/terms-of-service.component';

import { LandingPageComponent } from './landing-page/containers/landing-page/landing-page.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'explore', loadChildren: './find-memorial/find-memorial.module#FindMemorialModule' },
  { path: 'create', loadChildren: './create-memorial/create-memorial.module#CreateMemorialModule', canActivate: [AuthGuardService] },
  { path: 'memorial', loadChildren: './view-memorial/view-memorial.module#ViewMemorialModule' },
  { path: 'profile', loadChildren: './user-profile/user-profile.module#UserProfileModule', canActivate: [AuthGuardService] },
  { path: 'organization', loadChildren: './organization/organization.module#OrganizationModule' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsOfServiceComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', component: LandingPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: false})
  ],
  declarations: [],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ]
})
export class AppRoutingModule {}
