import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Organization } from '@shared/models/organization.model';
import { Paginator } from '@shared/models/paginator.model';
import { User } from '@shared/models/user.model';
import { GetFirstOrgMembers } from '@store/organization-members/organization-members.actions';
import {
  getAllOrgMembers,
  getOrgMembersLoading,
  getOrgMembersPaginator,
  getOrgMembersSaving,
} from '@store/organization-members/organization-members.reducer';
import {
  CreateFreeOrgMemorial,
  GetFirstOrgMemorials,
  GetOrgMemorials,
} from '@store/organization-memorials/org-memorials.actions';
import {
  getAllOrgMemorials,
  getOrgMemorialsLoading,
  getOrgMemorialsPaginator,
  getOrgMemorialsSaving,
} from '@store/organization-memorials/org-memorials.reducer';
import { GetOrg } from '@store/organization/organization.actions';
import { getOrganization, getOrganizationError, getOrganizationLoaded } from '@store/organization/organization.reducer';
import { Observable } from 'rxjs';

import { GetOrgMembers } from './../../../store/organization-members/organization-members.actions';

@Component({
  selector: 'app-organization-show',
  templateUrl: './organization-show.component.html',
  styleUrls: ['./organization-show.component.scss']
})
export class OrganizationShowComponent implements OnInit {

  organization$: Observable<Organization>;
  memorials$: Observable<Memorial[]>;
  members$: Observable<User[]>;
  memorialsPaginator$: Observable<Paginator>;
  membersPaginator$: Observable<Paginator>;
  memorialsSaving$: Observable<boolean>;
  membersSaving$: Observable<boolean>;
  memorialsLoading$: Observable<boolean>;
  membersLoading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  error$: Observable<boolean>;

  orgId: string;
  memorialsPaginator: Paginator;
  membersPaginator: Paginator;

  memorialSearchForm: FormGroup;
  memberSearchForm: FormGroup;
  searchTimeout;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetOrg(params.id));
      this.store.dispatch(new GetFirstOrgMemorials(params.id));
      this.store.dispatch(new GetFirstOrgMembers(params.id));
      this.orgId = params.id;
    });
    this.organization$ = this.store.pipe(select(getOrganization));
    this.members$ = this.store.pipe(select(getAllOrgMembers));
    this.membersPaginator$ = this.store.pipe(select(getOrgMembersPaginator));
    this.membersSaving$ = this.store.pipe(select(getOrgMembersSaving));
    this.memorials$ = this.store.pipe(select(getAllOrgMemorials));
    this.memorialsPaginator$ = this.store.pipe(select(getOrgMemorialsPaginator));
    this.memorialsSaving$ = this.store.pipe(select(getOrgMemorialsSaving));
    this.memorialsLoading$ = this.store.pipe(select(getOrgMemorialsLoading));
    this.membersLoading$ = this.store.pipe(select(getOrgMembersLoading));
    this.loaded$ = this.store.pipe(select(getOrganizationLoaded));
    this.error$ = this.store.pipe(select(getOrganizationError));
    this.memorialsPaginator$.subscribe(res => this.memorialsPaginator = res);
    this.membersPaginator$.subscribe(res => this.membersPaginator = res);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.memorialSearchForm = this.fb.group({
      q: ''
    });
    this.memberSearchForm = this.fb.group({
      q: ''
    });
  }

  createFreeMemorial() {
    this.store.dispatch(new CreateFreeOrgMemorial(this.orgId));
  }

  onMembersChange(event) {
    const payload = {
      id: this.orgId,
      paginator: event
    };
    this.store.dispatch(new GetOrgMembers(payload));
  }

  onMemorialsSort(event) {
    const payload = {
      id: this.orgId,
      paginator: event
    };
    this.store.dispatch(new GetOrgMemorials(payload));
  }

  onMemorialsSearch() {
    this.memorialsPaginator.q = this.memorialSearchForm.value.q;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.memorialsPaginator.p = '1';
      const payload = {
        id: this.orgId,
        paginator: this.memorialsPaginator
      };
      this.store.dispatch(new GetOrgMemorials(payload));
    }, 250);
  }

  clearMemorialsSearch() {
    this.memorialSearchForm.setValue({q: ''});
    this.memorialsPaginator.q = this.memorialSearchForm.value.q;
    clearTimeout(this.searchTimeout);
    this.memorialsPaginator.p = '1';
    const payload = {
      id: this.orgId,
      paginator: this.memorialsPaginator
    };
    this.store.dispatch(new GetOrgMemorials(payload));
  }

  onMembersSearch() {
    this.membersPaginator.q = this.memberSearchForm.value.q;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.membersPaginator.p = '1';
      const payload = {
        id: this.orgId,
        paginator: this.membersPaginator
      };
      this.store.dispatch(new GetOrgMembers(payload));
    }, 250);
  }

  clearMembersSearch() {
    this.memberSearchForm.setValue({q: ''});
    this.membersPaginator.q = this.memberSearchForm.value.q;
    clearTimeout(this.searchTimeout);
    this.membersPaginator.p = '1';
    const payload = {
      id: this.orgId,
      paginator: this.membersPaginator
    };
    this.store.dispatch(new GetOrgMembers(payload));
  }

}
