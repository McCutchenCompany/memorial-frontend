import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Auth0Login } from '@store/auth/auth.actions';
import { AuthState } from '@store/models/auth-state.model';
import * as auth0 from 'auth0-js';

import { Auth0LoginSuccess } from './../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0 = new auth0.WebAuth(environment.auth0);

  constructor(
    private http: HttpClient,
    public router: Router,
    public store: Store<AuthState>
  ) {}

  static getToken(): string {
    return localStorage.getItem('access_token');
  }

  static getUuid(): string {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.access_token);
    return decodedToken['https://linuxacademy.com/auth/uuid'] || null;
  }

  renewToken() {
    this.auth0.checkSession({
      audience: environment.auth0.audience,
      scope: 'openid email profile',
      redirectUri: window.location.origin,
    }, (err, result) => {
      if (err) {
        this.store.dispatch(new Auth0Login());
      } else {
        return new Auth0LoginSuccess(result);
      }
    });
  }
}
