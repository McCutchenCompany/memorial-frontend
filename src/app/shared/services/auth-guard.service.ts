import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Auth0Login, Auth0LoginSuccess } from '@store/auth/auth.actions';
import * as auth0 from 'auth0-js';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private store: Store<any>) {}

  auth0 = new auth0.WebAuth(environment.auth0);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     // Check if there is an `access_token` in localStorage
    if (AuthService.getToken()) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(localStorage.access_token);
      if (isExpired) {
        // Dispatch action to validate local token
        localStorage.setItem('reroute', state.url);
        this.store.dispatch(new Auth0Login());
      } else {
        // TODO: Add a timer (expiration less 10 minutes) for silent token refresh.
        return of(true);
      }
    } else {
      localStorage.setItem('reroute', state.url);
      // Start the Auth0 Login process
      console.log('check session');
      console.log('does this happen');
      return this.checkSession();
    }
  }

  checkSession(): Observable<boolean> {
    return this.auth0.checkSession({
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
          this.router.navigateByUrl(localStorage.getItem('reroute'));
          return true;
        } else {
          this.store.dispatch(new Auth0Login());
          return false;
        }
      }
    });
  }
}
