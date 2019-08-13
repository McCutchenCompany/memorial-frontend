import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Paginator } from '@shared/models/paginator.model';
import { OrganizationService } from 'app/organization/services/organization.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  CreateFreeOrgMemorial,
  CreateOrgMemorialFailure,
  CreateOrgMemorialSuccess,
  GetFirstOrgMemorials,
  GetOrgMemorials,
  GetOrgMemorialsFailure,
  GetOrgMemorialsSuccess,
  OrgMemActionTypes,
} from './org-memorials.actions';

@Injectable()
export class OrgMemorialEffects {
  constructor(
    private actions: Actions,
    private api: OrganizationService,
    private router: Router
  ) {}

  @Effect()
  getFirstOrgMemorials$: Observable<Action> = this.actions.pipe(
    ofType(OrgMemActionTypes.GET_FIRST_ORG_MEMORIALS),
    switchMap((action: GetFirstOrgMemorials) => {
      const paginator: Paginator = {q: '', p: '1', per_p: '20', o_column: 'created_at', o_direction: 'desc', total: 0};
      return this.api.getOrgMemorials(action.payload, paginator).pipe(
        map((res: {results: Memorial[], pagination: Paginator}) => new GetOrgMemorialsSuccess(res)),
        catchError(error => of(new GetOrgMemorialsFailure(error)))
      );
    })
  );

  @Effect()
  getOrgMemorials$: Observable<Action> = this.actions.pipe(
    ofType(OrgMemActionTypes.GET_ORG_MEMORIALS),
    switchMap((action: GetOrgMemorials) => this.api.getOrgMemorials(action.payload.id, action.payload.paginator).pipe(
      map((res: {results: Memorial[], pagination: Paginator}) => new GetOrgMemorialsSuccess(res)),
      catchError(error => of(new GetOrgMemorialsFailure(error)))
    ))
  );

  @Effect()
  createFreeOrgMemorial$: Observable<Action> = this.actions.pipe(
    ofType(OrgMemActionTypes.CREATE_FREE_ORG_MEMORIAL),
    switchMap((action: CreateFreeOrgMemorial) => this.api.createOrganizationMemorial(action.payload).pipe(
      map((res: Memorial) => new CreateOrgMemorialSuccess(res)),
      catchError(error => of(new CreateOrgMemorialFailure(error)))
    ))
  );

  @Effect({dispatch: false})
  createOrgMemorialSuccess$ = this.actions.pipe(
    ofType(OrgMemActionTypes.CREATE_ORG_MEMORIAL_SUCCESS),
    map((action: CreateOrgMemorialSuccess) => {
      this.router.navigateByUrl(`/create/${action.payload.uuid}`);
    })
  );
}
