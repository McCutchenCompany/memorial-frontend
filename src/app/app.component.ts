import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalTokenCheck } from '@store/auth/auth.actions';
import { AuthState } from '@store/models/auth-state.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    if (localStorage.access_token) {
      this.store.dispatch(new LocalTokenCheck());
    }
  }
}
