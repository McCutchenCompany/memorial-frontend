import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { User } from '@shared/models/user.model';
import { Auth0LoginFailure, Auth0LoginSuccess } from '@store/auth/auth.actions';
import { getUser } from '@store/auth/auth.reducer';
import { AuthState } from '@store/models/auth-state.model';
import * as auth0 from 'auth0-js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  auth0 = new auth0.WebAuth(environment.auth0);

  profile$: Observable<User>;

  constructor(
    private store: Store<AuthState>,
    private router: Router
  ) {
    this.profile$ = this.store.pipe(select(getUser));
  }

  ngOnInit() {
    this.profile$.subscribe(user => {
      if (user && user.uuid) {
        this.router.navigateByUrl('/profile');
      }
    });
    // This page gets hit from the Auth0 callback
    // TODO: Move to an action/effect
    // this.store.dispatch(new Auth0HashCheck());
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.store.dispatch(new Auth0LoginSuccess({ ...authResult }));
      } else if (err) {
        this.store.dispatch(new Auth0LoginFailure({ ...err }));
      }
    });
  }

}
