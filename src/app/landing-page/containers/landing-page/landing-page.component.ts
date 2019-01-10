import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { Auth0Login } from '@store/auth/auth.actions';
import { AppState } from '@store/models/app-state.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  get loggedIn() {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onCreateMemorial() {
    if (this.loggedIn) {
      this.dialog.open(PaymentComponent, {
        closeOnNavigation: true
      });
    } else {
      this.store.dispatch(new Auth0Login());
    }
  }

}
