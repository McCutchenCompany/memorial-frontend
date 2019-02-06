import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GetCreateMemorial, UpdateCreateMemorial } from '@store/create-memorial/create-memorial.actions';
import {
  getCreateError,
  getCreateLoaded,
  getCreateLoading,
  getCreateMemorial,
  getCreateSearchAddress,
} from '@store/create-memorial/create-memorial.reducer';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-memorial',
  templateUrl: './create-memorial.component.html',
  styleUrls: ['./create-memorial.component.scss']
})
export class CreateMemorialComponent implements OnInit {

  memorial$: Observable<any>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  locationSearch$: Observable<any>;
  error$: Observable<any>;
  routeFragment = 'info';

  memorialUUID;

  get activeTab() {
    switch (this.routeFragment) {
      case 'info': {
        return 0;
      }
      case 'timeline': {
        return 1;
      }
      case 'location': {
        return 2;
      }
      case 'memories': {
        return 3;
      }
      default: return 0;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<CreateMemorialState>,
    private router: Router
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.loading$ = this.store.pipe(select(getCreateLoading));
    this.loaded$ = this.store.pipe(select(getCreateLoaded));
    this.locationSearch$ = this.store.pipe(select(getCreateSearchAddress));
    this.error$ = this.store.pipe(select(getCreateError));
    this.memorial$.subscribe(res => {
      if (res && res.memorial) {
        this.memorialUUID = res.memorial.uuid;
      }
    });
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => this.routeFragment = fragment);
    this.route.params.subscribe(params => {
      if (params.id) {
        this.store.dispatch(new GetCreateMemorial(params.id));
      }
    });
  }

  onTabChange(event) {
    this.router.navigate([], {
      relativeTo: this.route,
      fragment: event.tab.textLabel.toLowerCase() !== 'basic info' ? event.tab.textLabel.toLowerCase() : null
    });
  }

  onUpdateMemorial(body) {

  }

  togglePublish(published) {
    const payload = {
      uuid: this.memorialUUID,
      body: {
        published: published
      }
    };
    this.store.dispatch(new UpdateCreateMemorial(payload));
  }

}
