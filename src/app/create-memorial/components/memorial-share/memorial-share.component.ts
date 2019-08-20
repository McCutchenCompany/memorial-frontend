import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Paginator } from '@shared/models/paginator.model';
import { User } from '@shared/models/user.model';
import { getCreateMemorial } from '@store/create-memorial/create-memorial.reducer';
import { GetFirstMemorialMembers, GetMemorialMembers } from '@store/memorial-members/memorial-members.actions';
import {
  getAllMemorialMembers,
  getMemorialMembersLoading,
  getMemorialMembersPaginator,
  getMemorialMembersSaving,
  getMemorialOrganization,
} from '@store/memorial-members/memorial-members.reducer';
import { getRouterState } from '@store/router/router.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-memorial-share',
  templateUrl: './memorial-share.component.html',
  styleUrls: ['./memorial-share.component.scss']
})
export class MemorialShareComponent implements OnInit {

  memorial$: Observable<any>;
  members$: Observable<User[]>;
  memberPaginator$: Observable<Paginator>;
  memberLoading$: Observable<boolean>;
  memberSaving$: Observable<boolean>;
  org$: Observable<any>;
  memorial: Memorial;
  memorialId;

  get join_link() {
    return `${environment.url}memorial/edit/${this.memorial.invite_link}`;
  }

  get display_link() {
    return `${environment.url}memorial/edit`;
  }


  constructor(
    private store: Store<any>,
    private sanitizer: DomSanitizer
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.members$ = this.store.pipe(select(getAllMemorialMembers));
    this.memberPaginator$ = this.store.pipe(select(getMemorialMembersPaginator));
    this.memberLoading$ = this.store.pipe(select(getMemorialMembersLoading));
    this.memberSaving$ = this.store.pipe(select(getMemorialMembersSaving));
    this.org$ = this.store.pipe(select(getMemorialOrganization));
    this.memorial$.subscribe(res => {
      if (res.memorial) {
        this.memorial = res.memorial;
      }
    });
    this.store.pipe(select(getRouterState)).subscribe(route => {
      if (route.state.root.children[0].children[0].params && !this.memorialId) {
        this.memorialId = route.state.root.children[0].children[0].params.id;
        this.store.dispatch(new GetFirstMemorialMembers(this.memorialId));
      }
    });
  }

  ngOnInit() {
  }

  orgImage(org) {
    if (org.image) {
      return {
        src: `${environment.s3.url}${org.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${org.scale / 100})
          rotate(${org.rot}deg)
          translate(${org.posX.toString()}px, ${org.posY.toString()}px)`
        )
      };
    } else {
      return {
        src: 'assets/imgs/location.jpeg',
        transform: ''
      };
    }
  }

  showToolTip(tooltip: MatTooltip) {
    tooltip.message = 'Copied';
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
      tooltip.message = 'Copy';
    }, 1000);
  }

  onMembersChange(event) {
    const payload = {
      id: this.memorialId,
      paginator: event
    };
    this.store.dispatch(new GetMemorialMembers(payload));
  }

  onMemorialsSort(event) {
    const payload = {
      id: this.memorialId,
      paginator: event
    };
    this.store.dispatch(new GetMemorialMembers(payload));
  }

}
