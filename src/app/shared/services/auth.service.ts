import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0 = new auth0.WebAuth(environment.auth0);

  constructor(private http: HttpClient, public router: Router) {}

  static getToken(): string {
    return localStorage.getItem('access_token');
  }

  static getUuid(): string {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.access_token);
    return decodedToken['https://linuxacademy.com/auth/uuid'] || null;
  }
}
