import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CallbackComponent } from '@shared/components/callback/callback.component';
import { reducer } from '@store/auth/auth.reducer';

import { RouterModule } from '../../node_modules/@angular/router';
import { routerReducer, StoreRouterConnectingModule } from '../../node_modules/@ngrx/router-store';
import { StoreModule } from '../../node_modules/@ngrx/store';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeaderComponent } from './shared/components/nav-header/nav-header.component';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { appReducer } from './store/app/app.reducer';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    CallbackComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    StoreModule.forRoot({
      app: appReducer,
      router: routerReducer,
      auth: reducer
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],
    EffectsModule.forRoot([
      AuthEffects
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
