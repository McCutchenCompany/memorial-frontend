import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { OrganizationService } from 'app/organization/services/organization.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Paginator } from './../../shared/models/paginator.model';
import {
  GetFirstOrgMembers,
  GetOrgMembers,
  GetOrgMembersFailure,
  GetOrgMembersSuccess,
  OrgMemberActionTypes,
} from './organization-members.actions';

@Injectable()
export class OrgMembersEffects {
  constructor(
    private actions: Actions,
    private api: OrganizationService
  ) {}

  @Effect()
  getFirstMembers$: Observable<Action> = this.actions.pipe(
    ofType(OrgMemberActionTypes.GET_FIRST_ORG_MEMBERS),
    switchMap((action: GetFirstOrgMembers) => {
      const paginator: Paginator = {q: '', p: '1', per_p: '20', o_column: 'created_at', o_direction: 'desc', total: 0};
      return this.api.getOrgMembers(action.payload, paginator).pipe(
        map((res: {results: any[], pagination: Paginator}) => new GetOrgMembersSuccess(res)),
        catchError(error => of(new GetOrgMembersFailure(error)))
      );
    })
  );

  @Effect()
  getOrgMembers$: Observable<Action> = this.actions.pipe(
    ofType(OrgMemberActionTypes.GET_ORG_MEMBERS),
    switchMap((action: GetOrgMembers) => this.api.getOrgMembers(action.payload.id, action.payload.paginator).pipe(
      map((res: {results: any[], pagination: Paginator}) => new GetOrgMembersSuccess(res)),
      catchError(error => of(new GetOrgMembersFailure(error)))
    ))
  );
}
