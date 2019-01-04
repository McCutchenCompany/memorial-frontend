import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from '@shared/models/user.model';
import { UpdateProfile } from '@store/auth/auth.actions';
import { Observable } from 'rxjs';

import { getUser } from './../../../store/auth/auth.reducer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userForm: FormGroup;
  user$: Observable<User>;
  userId;

  constructor(
    public fb: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {

    this.user$ = this.store.pipe(select(getUser));
  }

  ngOnInit() {
  }


  onSave(payload) {
    this.store.dispatch(new UpdateProfile(payload));
    const sub = this.user$.subscribe(res => {
      if (res.first_name && res.last_name) {
        this.router.navigate(['/profile']);
        sub.unsubscribe();
      }
    });
  }
}
