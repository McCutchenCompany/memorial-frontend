import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UnlockPurchaseComponent } from '@shared/components/unlock-purchase/unlock-purchase.component';
import { Memorial } from '@shared/models/memorial.model';
import {
  ClearCreateMemorial,
  GetCreateMemorial,
  UpdateCreateMemorial,
} from '@store/create-memorial/create-memorial.actions';
import {
  getCreateError,
  getCreateLoaded,
  getCreateLoading,
  getCreateMemorial,
  getCreateSearchAddress,
} from '@store/create-memorial/create-memorial.reducer';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { getRouterState } from '@store/router';
import { Observable } from 'rxjs';

import { getCreatedSaving } from './../../../store/create-memorial/create-memorial.reducer';

@Component({
  selector: 'app-create-memorial',
  templateUrl: './create-memorial.component.html',
  styleUrls: ['./create-memorial.component.scss']
})
export class CreateMemorialComponent implements OnInit, AfterViewInit, OnDestroy {

  memorial$: Observable<any>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  saving$: Observable<boolean>;
  locationSearch$: Observable<any>;
  error$: Observable<any>;
  routeFragment = 'info';
  unlockOverlay = false;

  public medium = 1200;
  public opened = true;

  isHover = false;
  memorialUUID;
  memorial: Memorial;

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
    private renderer: Renderer2,
    private breakpoint: BreakpointObserver,
    private dialog: MatDialog
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.loading$ = this.store.pipe(select(getCreateLoading));
    this.loaded$ = this.store.pipe(select(getCreateLoaded));
    this.locationSearch$ = this.store.pipe(select(getCreateSearchAddress));
    this.error$ = this.store.pipe(select(getCreateError));
    this.saving$ = this.store.pipe(select(getCreatedSaving));
    this.memorial$.subscribe(res => {
      if (res && res.memorial) {
        this.memorialUUID = res.memorial.uuid;
        this.memorial = res.memorial;
      }
    });
    this.store.pipe(select(getRouterState)).subscribe(res => {
      if (res.state.url.indexOf('timeline') > 0 || res.state.url.indexOf('photo') > 0) {
        this.unlockOverlay = true;
      } else {
        this.unlockOverlay = false;
      }
    });
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'create-no-scroll');
    this.route.params.subscribe(params => {
      if (params.id) {
        this.store.dispatch(new GetCreateMemorial(params.id));
        this.memorialUUID = params.id;
      }
    });
  }

  ngAfterViewInit() {
    this.memorial$.subscribe(res => {
      if (res.memorial) {
        setTimeout(() => {
          this.breakpoint.observe([`(max-width: ${this.medium}px)`])
          .subscribe((status: BreakpointState) => {
            this.opened = !status.matches;
          });
        }, 100);
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'create-no-scroll');
    this.store.dispatch(new ClearCreateMemorial());
  }

  toggleSidebar() {
    this.opened = !this.opened;
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

  toggleHover() {
    this.isHover = !this.isHover;
  }

  openUnlock() {
    this.dialog.open(UnlockPurchaseComponent, {
      data: this.memorial
    }).afterClosed().subscribe(res => {
      if (res && res.purchased) {
        this.store.dispatch(new GetCreateMemorial(this.memorialUUID));
      }
    });
  }

}
