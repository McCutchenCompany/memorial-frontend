import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  GestureConfig,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CallbackComponent } from '@shared/components/callback/callback.component';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { SharedModule } from '@shared/shared.module';
import { AppEffects, appReducer } from '@store/app';
import { AuthEffects } from '@store/auth/auth.effects';
import { reducer } from '@store/auth/auth.reducer';
import { popularMemorialsReducer } from '@store/find-memorial/reducers/popular.reducer';

import { RouterModule } from '../../node_modules/@angular/router';
import { routerReducer, StoreRouterConnectingModule } from '../../node_modules/@ngrx/router-store';
import { StoreModule } from '../../node_modules/@ngrx/store';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/containers/landing-page/landing-page.component';
import { NavHeaderComponent } from './shared/components/nav-header/nav-header.component';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { FindMemorialsEffects } from './store/find-memorial/effects/find-memorials.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    CallbackComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SharedModule,
    StoreModule.forRoot({
      app: appReducer,
      router: routerReducer,
      auth: reducer,
      popular: popularMemorialsReducer
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],
    EffectsModule.forRoot([
      AuthEffects,
      AppEffects,
      FindMemorialsEffects
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    }
  ],
  entryComponents: [
    PaymentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
