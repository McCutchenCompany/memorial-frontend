import { Injectable } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { RouterStateUrl } from '@store/router';
import { Observable } from 'rxjs';

import { getUser } from './../../store/auth/auth.reducer';
import { getRouterState } from './../../store/router/router.reducer';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  routerState$: Observable<RouterReducerState<RouterStateUrl>>;
  user$: Observable<any>;
  userId;

  constructor(
    private store: Store<RouterReducerState<RouterStateUrl>>
  ) {
    this.routerState$ = this.store.pipe(select(getRouterState));
    this.user$ = this.store.pipe(select(getUser));
  }

  sendPageViews() {
    this.routerState$.subscribe(res => {
      if (res) {
        const config = {
          'page_path': res.state.url,
        };
        if (this.userId) {
          config['user_id'] = this.userId;
        }
        (<any>window).gtag('config', 'UA-133315587-1', config);
      }
    });
  }

  sendUserId() {
    this.user$.subscribe(res => {
      if (res.uuid) {
        this.userId = res.uuid;
        (<any>window).gtag('set', {'user_id': res.uuid});
      }
    });
  }

  sendEvent(action: string, category?: string, label?: string, value?: number) {
    const eventParams = {};
    if (category) {
      eventParams['event_category'] = category;
    }
    if (label) {
      eventParams['event_label'] = label;
    }
    if (value) {
      eventParams['value'] = value;
    }
    if (!eventParams['event_category'] && !eventParams['event_label']) {
      (<any>window).gtag('event', action);
    } else {
      (<any>window).gtag('event', action, eventParams);
    }
  }

}
