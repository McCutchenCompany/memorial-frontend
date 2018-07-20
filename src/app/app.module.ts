import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RouterModule } from '../../node_modules/@angular/router';
import { routerReducer, StoreRouterConnectingModule } from '../../node_modules/@ngrx/router-store';
import { StoreModule } from '../../node_modules/@ngrx/store';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer } from './store/app/app.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiBi3u4zjpmFUKCu7gFydLmdr_cgzo3oE'
    }),
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    StoreModule.forRoot({
      app: appReducer,
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
