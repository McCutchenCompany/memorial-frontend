import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from '@shared/models/user.model';
import { Auth0Login } from '@store/auth/auth.actions';
import { getUser } from '@store/auth/auth.reducer';
import { ViewMemorialState } from '@store/models/view-memorial-state.model';
import { AddMemory, GetMemorial } from '@store/view-memorial/view-memorial.actions';
import {
  getViewMemorial,
  getViewMemorialError,
  getViewMemorialLoaded,
  getViewMemorialLoading,
} from '@store/view-memorial/view-memorial.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-memorial',
  templateUrl: './view-memorial.component.html',
  styleUrls: ['./view-memorial.component.scss']
})
export class ViewMemorialComponent implements OnInit {

  selectedMemorial$: Observable<any>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  user$: Observable<User>;
  error$: Observable<any>;

  memorial_id: string;

  constructor(
    public route: ActivatedRoute,
    public store: Store<ViewMemorialState>
  ) {
    this.selectedMemorial$ = this.store.pipe(select(getViewMemorial));
    this.loading$ = this.store.pipe(select(getViewMemorialLoading));
    this.loaded$ = this.store.pipe(select(getViewMemorialLoaded));
    this.user$ = this.store.pipe(select(getUser));
    this.error$ = this.store.pipe(select(getViewMemorialError));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.memorial_id = params.id;
        this.store.dispatch(new GetMemorial(params.id));
      }
    });
  }

  onAddMemory(event) {
    const payload = {
      memorial_id: this.memorial_id,
      body: {
        title: event.title,
        description: event.description
      }
    };
    this.store.dispatch(new AddMemory(payload));
  }

  onLogin() {
    localStorage.setItem('reroute', `/memorial/${this.memorial_id}`);
    this.store.dispatch(new Auth0Login());
  }

}
