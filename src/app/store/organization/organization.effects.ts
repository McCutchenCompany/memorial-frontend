import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
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
} from './organization.actions';

@Injectable()
export class OrganizationEffects {
  constructor(
    private actions: Actions,
    private api: OrganizationService,
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
  getOrg$ = this.actions.pipe(
    ofType(OrganizationActionTypes.GET_ORG),
    switchMap((action: GetOrg) => this.api.getOrganization(action.payload).pipe(
      map((res: Organization) => new GetOrgSuccess(res)),
      catchError(error => of(new GetOrgFailure(error)))
    ))
  );
}
