import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LocalTokenCheck } from '@store/auth/auth.actions';
import { AuthState } from '@store/models/auth-state.model';
import { getRouterState } from '@store/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  route$: Observable<any>;

  constructor(private store: Store<AuthState>) {
    this.route$ = this.store.pipe(select(getRouterState));
  }

  ngOnInit() {
    if (localStorage.access_token) {
      this.store.dispatch(new LocalTokenCheck());
    }
  }
}
