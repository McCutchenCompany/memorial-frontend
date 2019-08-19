import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { CreateFreeMemorial } from '@store/app';
import { Auth0Login, SignOut } from '@store/auth/auth.actions';
import { AuthState } from '@store/models/auth-state.model';

import { CreateMemorialOptionsComponent } from './../create-memorial-options/create-memorial-options.component';
import { PaymentComponent } from './../payment/payment.component';

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
    private store: Store<AuthState>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  onLogin() {
    this.store.dispatch(new Auth0Login());
  }

  onLogout() {
    this.store.dispatch(new SignOut());
  }

  onCreateMemorial() {
    if (this.loggedIn) {
      this.dialog.open(CreateMemorialOptionsComponent, {
        maxWidth: '38.75rem',
        width: '100vw',
        autoFocus: false
      }).afterClosed().subscribe(res => {
        if (res) {
          res.free ? this.store.dispatch(new CreateFreeMemorial()) : this.dialog.open(PaymentComponent, {
            closeOnNavigation: true
          });
        }
      });
    } else {
      this.store.dispatch(new Auth0Login());
    }
  }

}
