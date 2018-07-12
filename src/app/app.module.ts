import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '../../node_modules/@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateMemorialModule } from './create-memorial/create-memorial.module';
import { FindMemorialModule } from './find-memorial/find-memorial.module';
import { ViewMemorialModule } from './view-memorial/view-memorial.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CreateMemorialModule,
    FindMemorialModule,
    RouterModule,
    ViewMemorialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
