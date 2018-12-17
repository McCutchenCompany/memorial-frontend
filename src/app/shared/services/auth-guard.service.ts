import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Auth0Login, Auth0LoginSuccess, LocalTokenCheck } from '@store/auth/auth.actions';
import * as auth0 from 'auth0-js';

import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private store: Store<any>) {}

  auth0 = new auth0.WebAuth(environment.auth0);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     // Check if there is an `access_token` in localStorage
    if (AuthService.getToken()) {
      // Dispatch action to validate local token
      localStorage.setItem('reroute', state.url);
      this.store.dispatch(new LocalTokenCheck());
      // TODO: Add a timer (expiration less 10 minutes) for silent token refresh.
      return true;
    } else {
      localStorage.setItem('reroute', state.url);
      // Start the Auth0 Login process
      this.auth0.checkSession({
        audience: environment.auth0.audience,
        scope: 'openid email profile',
        redirectUri: window.location.origin,
      }, (err, result) => {
        if (err) {
          this.store.dispatch(new Auth0Login());
          console.log('error: ', err);
        } else {
          if (result) {
            this.store.dispatch(new Auth0LoginSuccess(result));
          } else {
            this.store.dispatch(new Auth0Login());
          }
        }
      });
    }
      return false;
    }
}
