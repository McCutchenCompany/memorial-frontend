import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  private authService: AuthService;

  constructor(
    private injector: Injector
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Intercept ca-backend requests and append token
  if (localStorage.access_token) {
    this.authService = this.injector.get(AuthService);
    const token = AuthService.getToken();
    request = request.clone({
        setHeaders: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
  } else {
    request = request.clone({
      setHeaders: {
          'Content-Type': 'application/json'
      }
    });
  }

  return next.handle(request);
  }
}
