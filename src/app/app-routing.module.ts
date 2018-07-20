import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'explore', loadChildren: './find-memorial/find-memorial.module#FindMemorialModule' },
  { path: 'create', loadChildren: './create-memorial/create-memorial.module#CreateMemorialModule' },
  { path: 'view', loadChildren: './view-memorial/view-memorial.module#ViewMemorialModule' },
  { path: '', redirectTo: '/explore', pathMatch: 'full' },
  { path: '**', redirectTo: '/explore', pathMatch: 'full' }
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
