import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ImageUploadService } from '@shared/services/image-upload.service';
import { OrganizationService } from 'app/organization/services/organization.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Organization } from './../../shared/models/organization.model';
import {
  CreateOrg,
  CreateOrgFailure,
  CreateOrgSuccess,
  GetOrg,
  GetOrgFailure,
  GetOrgSuccess,
  OrganizationActionTypes,
  RemoveOrgImage,
  RemoveOrgImageFailure,
  RemoveOrgImageSuccess,
  ReplaceOrgImage,
  ReplaceOrgImageFailure,
  ReplaceOrgImageSuccess,
  UpdateOrg,
  UpdateOrgFailure,
  UpdateOrgSuccess,
  UploadOrgImage,
  UploadOrgImageFailure,
  UploadOrgImageSuccess,
} from './organization.actions';

@Injectable()
export class OrganizationEffects {
  constructor(
    private actions: Actions,
    private api: OrganizationService,
    private upload: ImageUploadService,
    private router: Router,
    private store: Store<any>
  ) {}

  @Effect()
  createOrg$: Observable<Action> = this.actions.pipe(
    ofType(OrganizationActionTypes.CREATE_ORG),
    switchMap((action: CreateOrg) => this.api.createOrganization(action.payload).pipe(
      map((res: Organization) => new CreateOrgSuccess(res)),
      catchError(error => of(new CreateOrgFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  createOrgSuccess$ = this.actions.pipe(
    ofType(OrganizationActionTypes.CREATE_ORG_SUCCESS),
    map((action: CreateOrgSuccess) => {
      this.router.navigateByUrl(`/organization/${action.payload.uuid}`);
    })
  );

  @Effect()
  updateOrg$: Observable<Action> = this.actions.pipe(
    ofType(OrganizationActionTypes.UPDATE_ORG),
    switchMap((action: UpdateOrg) => this.api.updateOrganization(action.payload.id, action.payload.body).pipe(
      map((res: Organization) => new UpdateOrgSuccess(res)),
      catchError(error => of(new UpdateOrgFailure(error)))
    ))
  );

  @Effect()
  getOrg$ = this.actions.pipe(
    ofType(OrganizationActionTypes.GET_ORG),
    switchMap((action: GetOrg) => this.api.getOrganization(action.payload).pipe(
      map((res: Organization) => new GetOrgSuccess(res)),
      catchError(error => of(new GetOrgFailure(error)))
    ))
  );

  @Effect()
  uploadOrganizationImage$: Observable<Action> = this.actions.pipe(
    ofType(OrganizationActionTypes.UPLOAD_ORG_IMAGE),
    switchMap((action: UploadOrgImage) => this.upload.uploadOrgImage(action.payload.id, action.payload.image).pipe(
      map((org: Organization) => new UploadOrgImageSuccess(org)),
      catchError(error => of(new UploadOrgImageFailure(error)))
    ))
  );

  @Effect()
  replaceOrganizationImage$: Observable<Action> = this.actions.pipe(
    ofType(OrganizationActionTypes.REPLACE_ORG_IMAGE),
    switchMap((action: ReplaceOrgImage) => this.upload.replaceOrgImage(action.payload.id, action.payload.image).pipe(
      map((org: Organization) => new ReplaceOrgImageSuccess(org)),
      catchError(error => of(new ReplaceOrgImageFailure(error)))
    ))
  );

  @Effect()
  removeOrganizationImage$: Observable<Action> = this.actions.pipe(
    ofType(OrganizationActionTypes.REMOVE_ORG_IMAGE),
    switchMap((action: RemoveOrgImage) => this.upload.removeOrgImage(action.payload.id, action.payload.route).pipe(
      map(org => new RemoveOrgImageSuccess(org)),
      catchError(error => of(new RemoveOrgImageFailure(error)))
    ))
  );
}
