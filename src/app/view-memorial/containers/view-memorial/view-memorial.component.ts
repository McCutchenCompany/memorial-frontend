import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MilitaryHistory } from '@shared/models/military.model';
import { User } from '@shared/models/user.model';
import { GoogleAnalyticsService } from '@shared/services/google-analytics.service';
import { Auth0Login } from '@store/auth/auth.actions';
import { getUser } from '@store/auth/auth.reducer';
import { ViewMemorialState } from '@store/models/view-memorial-state.model';
import { AddMemory, GetMemorial } from '@store/view-memorial/view-memorial.actions';
import {
  getViewMemorial,
  getViewMemorialError,
  getViewMemorialLoaded,
  getViewMemorialLoading,
  getViewMilitary,
} from '@store/view-memorial/view-memorial.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-memorial',
  templateUrl: './view-memorial.component.html',
  styleUrls: ['./view-memorial.component.scss']
})
export class ViewMemorialComponent implements OnInit {

  selectedMemorial$: Observable<any>;
  militaryHistory$: Observable<MilitaryHistory[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  user$: Observable<User>;
  error$: Observable<any>;

  memorial_id: string;

  constructor(
    public route: ActivatedRoute,
    public store: Store<ViewMemorialState>,
    private analytics: GoogleAnalyticsService
  ) {
    this.selectedMemorial$ = this.store.pipe(select(getViewMemorial));
    this.militaryHistory$ = this.store.pipe(select(getViewMilitary));
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
        this.analytics.sendEvent(params.id, 'Memorial View', 'Memorial ID');
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
