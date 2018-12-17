import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from '@shared/models/user.model';
import { getAuthLoaded, getAuthLoading, getUser } from '@store/auth/auth.reducer';
import { AuthState } from '@store/models/auth-state.model';
import { Observable } from 'rxjs';

import { UpdateProfile } from './../../../store/auth/auth.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user$: Observable<User>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(
    private store: Store<AuthState>
  ) {
    this.user$ = this.store.pipe(select(getUser));
    this.loading$ = this.store.pipe(select(getAuthLoading));
    this.loaded$ = this.store.pipe(select(getAuthLoaded));
  }

  ngOnInit() {
  }

  onEdit(payload) {
    this.store.dispatch(new UpdateProfile(payload));
  }

}
