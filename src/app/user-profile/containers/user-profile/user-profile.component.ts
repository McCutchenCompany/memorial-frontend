import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from '@shared/models/user.model';
import { GetProfile, UpdateProfile } from '@store/auth/auth.actions';
import { getAuthLoaded, getAuthLoading, getUser } from '@store/auth/auth.reducer';
import { AuthState } from '@store/models/auth-state.model';
import { PurchaseLicense } from '@store/user-profile/user-profile.actions';
import { Observable } from 'rxjs';

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
    this.store.dispatch(new GetProfile());
  }

  onEdit(payload) {
    this.store.dispatch(new UpdateProfile(payload));
  }

  onAddMemorial(payload) {
    this.store.dispatch(new PurchaseLicense(payload));
  }

}
