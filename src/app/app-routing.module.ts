import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateMemorialComponent } from './create-memorial/components/create-memorial/create-memorial.component';
import { FindMemorialComponent } from './find-memorial/components/find-memorial/find-memorial.component';
import { ViewMemorialComponent } from './view-memorial/components/view-memorial/view-memorial.component';

const appRoutes: Routes = [
  { path: 'explore', component: FindMemorialComponent },
  { path: 'create', component: CreateMemorialComponent },
  { path: 'view/:id', component: ViewMemorialComponent },
  { path: '', redirectTo: '/explore', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
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
