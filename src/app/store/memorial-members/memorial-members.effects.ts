import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CreateMemorialService } from './../../create-memorial/services/create-memorial.service';
import { Paginator } from './../../shared/models/paginator.model';
import {
  GetFirstMemorialMembers,
  GetMemorialMembers,
  GetMemorialMembersFailure,
  GetMemorialMembersSuccess,
  MemorialMemberActionTypes,
} from './memorial-members.actions';

@Injectable()
export class MemorialMembersEffects {
  constructor(
    private actions: Actions,
    private api: CreateMemorialService
  ) {}

  @Effect()
  getFirstMembers$: Observable<Action> = this.actions.pipe(
    ofType(MemorialMemberActionTypes.GET_FIRST_MEMORIAL_MEMBERS),
    switchMap((action: GetFirstMemorialMembers) => {
      const paginator: Paginator = {q: '', p: '1', per_p: '20', o_column: 'created_at', o_direction: 'desc', total: 0};
      return this.api.getMemorialMembers(action.payload, paginator).pipe(
        map((res: {results: any[], pagination: Paginator}) => new GetMemorialMembersSuccess(res)),
        catchError(error => of(new GetMemorialMembersFailure(error)))
      );
    })
  );

  @Effect()
  getMemorialMembers$: Observable<Action> = this.actions.pipe(
    ofType(MemorialMemberActionTypes.GET_MEMORIAL_MEMBERS),
    switchMap((action: GetMemorialMembers) => this.api.getMemorialMembers(action.payload.id, action.payload.paginator).pipe(
      map((res: {results: any[], pagination: Paginator}) => new GetMemorialMembersSuccess(res)),
      catchError(error => of(new GetMemorialMembersFailure(error)))
    ))
  );
}
