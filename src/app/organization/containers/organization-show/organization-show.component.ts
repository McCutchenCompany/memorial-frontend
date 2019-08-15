import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Organization } from '@shared/models/organization.model';
import { Paginator } from '@shared/models/paginator.model';
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

@Component({
  selector: 'app-organization-show',
  templateUrl: './organization-show.component.html',
  styleUrls: ['./organization-show.component.scss']
})
export class OrganizationShowComponent implements OnInit {

  organization$: Observable<Organization>;
  memorials$: Observable<Memorial[]>;
  paginator$: Observable<Paginator>;
  saving$: Observable<boolean>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  error$: Observable<boolean>;

  orgId: string;
  paginator: Paginator;

  searchForm: FormGroup;
  searchTimeout;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetOrg(params.id));
      this.store.dispatch(new GetFirstOrgMemorials(params.id));
      this.orgId = params.id;
    });
    this.organization$ = this.store.pipe(select(getOrganization));
    this.memorials$ = this.store.pipe(select(getAllOrgMemorials));
    this.paginator$ = this.store.pipe(select(getOrgMemorialsPaginator));
    this.saving$ = this.store.pipe(select(getOrgMemorialsSaving));
    this.loading$ = this.store.pipe(select(getOrgMemorialsLoading));
    this.loaded$ = this.store.pipe(select(getOrganizationLoaded));
    this.error$ = this.store.pipe(select(getOrganizationError));
    this.paginator$.subscribe(res => this.paginator = res);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      q: ''
    });
  }

  createFreeMemorial() {
    this.store.dispatch(new CreateFreeOrgMemorial(this.orgId));
  }

  onSort(event) {
    const payload = {
      id: this.orgId,
      paginator: event
    };
    this.store.dispatch(new GetOrgMemorials(payload));
  }

  onSearch() {
    this.paginator.q = this.searchForm.value.q;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.paginator.p = '1';
      const payload = {
        id: this.orgId,
        paginator: this.paginator
      };
      this.store.dispatch(new GetOrgMemorials(payload));
    }, 250);
  }

  clearSearch() {
    this.searchForm.setValue({q: ''});
    this.paginator.q = this.searchForm.value.q;
    clearTimeout(this.searchTimeout);
    this.paginator.p = '1';
    const payload = {
      id: this.orgId,
      paginator: this.paginator
    };
    this.store.dispatch(new GetOrgMemorials(payload));
  }

}
