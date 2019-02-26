import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { Memorial } from '@shared/models/memorial.model';
import { Auth0Login } from '@store/auth/auth.actions';
import { GetPopularMemorials } from '@store/find-memorial/actions/action.types';
import { getAllPopularMemorials } from '@store/find-memorial/selectors/popular-memorials.selector';
import { AppState } from '@store/models/app-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  popularMemorials$: Observable<Memorial[]>;

  example = environment.example;

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
  ) {
    this.popularMemorials$ = this.store.pipe(select(getAllPopularMemorials));
  }

  ngOnInit() {
    this.store.dispatch(new GetPopularMemorials());
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
