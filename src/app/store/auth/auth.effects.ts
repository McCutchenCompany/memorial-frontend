import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { CreateMemorialService } from 'app/create-memorial/services/create-memorial.service';
import * as auth0 from 'auth0-js';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthService } from './../../shared/services/auth.service';
import { ProfileService } from './../../user-profile/services/profile.service';
import {
  Auth0LoginFailure,
  Auth0LoginSuccess,
  AuthActionTypes,
  GetProfile,
  GetProfileFailure,
  GetProfileSuccess,
  LocalTokenInvalid,
  LocalTokenValid,
  UpdateProfile,
  UpdateUserMemorial,
  UpdateUserMemorialFailure,
  UpdateUserMemorialSuccess,
} from './auth.actions';
import { getUser } from './auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private api: ProfileService,
    private memorialApi: CreateMemorialService,
    private authService: AuthService,
    private router: Router,
    private store: Store<any>
  ) {}

  auth0 = new auth0.WebAuth(environment.auth0);

  // Call the Auth0 Universal Login page.
  @Effect({ dispatch: false })
  public auth0Login$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH0_LOGIN),
    tap(() => {
      // https://auth0.com/docs/libraries/auth0js/v9#webauth-authorize-
      this.auth0.authorize();
    })
  );

  @Effect({ dispatch: false })
  auth0LoginFailure$: Observable<Auth0LoginFailure> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH0_LOGIN_FAILURE),
    map((action: Auth0LoginFailure) => action.payload),
    tap(payload => {
      localStorage.removeItem('access_token');
      this.router.navigateByUrl('/error');
    })
  );

  @Effect()
  auth0LoginSuccess$: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH0_LOGIN_SUCCESS),
    map((action: Auth0LoginSuccess) => action.payload),
    map(payload => {
      // Set the token
      localStorage.setItem('access_token', payload.accessToken);
      return new GetProfile(payload);
    })
  );

  @Effect({ dispatch: false })
  public SignOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNOUT),
    tap(() => {
      this.router.navigateByUrl('/');
      localStorage.removeItem('access_token');
    })
  );

  @Effect()
  public localTokenCheck$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOCAL_TOKEN_CHECK),
    map(() => {
      if (localStorage.access_token) {
        const helper = new JwtHelperService();
        // If there's a token and expiry, has it already expired?
        const isExpired = helper.isTokenExpired(localStorage.access_token);
        if (!isExpired) {
          // If the local token is valid, we can parse it and fill in some state values
          const decodedToken = helper.decodeToken(localStorage.access_token);
          return new LocalTokenValid({
            decodedToken,
            accessToken: localStorage.access_token,
          });
        }
      }
      // If the LocalTokenValid action didn't fire, return it as invalid
      return new LocalTokenInvalid();
    })
  );

  @Effect()
  public localTokenValid$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOCAL_TOKEN_VALID),
    map((action: LocalTokenValid) => {
      return new GetProfile({});
    })
  );

  @Effect({dispatch: false})
  public localTokenInvalid$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOCAL_TOKEN_INVALID),
    map(() => {
      localStorage.removeItem('access_token');
    })
  );

  @Effect({dispatch: false})
  checkSession$: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.CHECK_SESSION),
    tap(() => {
      this.authService.renewToken();
    })
  );

  @Effect()
  getProfile$: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.GET_PROFILE),
    switchMap((action: GetProfile) => this.api.getProfile(action.payload).pipe(
      map(profile => new GetProfileSuccess(profile)),
      catchError(error => of(new GetProfileFailure(error)))
    ))
  );

  @Effect()
  updateProfile$: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.UPDATE_PROFILE),
    switchMap((action: UpdateProfile) => this.api.updateProfile(action.payload).pipe(
      map((profile) => new GetProfileSuccess(profile)),
      catchError(error => of(new GetProfileFailure(error)))
    ))
  );


  @Effect()
  updateUserMemorial$: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.UPDATE_USER_MEMORIAL),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([action, user]: [UpdateUserMemorial, any]) => {
      return this.memorialApi.updateCreateMemorial(action.payload.uuid, action.payload.body).pipe(
        map((res: Memorial) => {
          const userMemorials = user.memorials;
          const index = userMemorials.findIndex(memorial => memorial.uuid === res.uuid);
          if (index !== -1) {
            userMemorials[index] = res;
          }
          return new UpdateUserMemorialSuccess(userMemorials);
        }),
        catchError(error => of(new UpdateUserMemorialFailure(error)))
      );
    })
  );

}
