import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Auth0LoginFailure, Auth0LoginSuccess } from '@store/auth/auth.actions';
import { AuthState } from '@store/models/auth-state.model';
import * as auth0 from 'auth0-js';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  auth0 = new auth0.WebAuth(environment.auth0);

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    // This page gets hit from the Auth0 callback
    // TODO: Move to an action/effect
    // this.store.dispatch(new Auth0HashCheck());
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.store.dispatch(new Auth0LoginSuccess({ ...authResult }));
      } else if (err) {
        this.store.dispatch(new Auth0LoginFailure({ ...err }));
      }
    });
  }

}
