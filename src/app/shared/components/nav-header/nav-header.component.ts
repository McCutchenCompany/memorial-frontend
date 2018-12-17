import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/models/auth-state.model';

import { Auth0Login } from './../../../store/auth/auth.actions';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  get loggedIn() {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
  }

  onLogin() {
    this.store.dispatch(new Auth0Login());
  }

}
