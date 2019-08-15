import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Organization } from '@shared/models/organization.model';
import { GetOrg, RemoveOrgImage, UpdateOrg } from '@store/organization/organization.actions';
import { getOrganization, getOrganizationSaved, getOrganizationSaving } from '@store/organization/organization.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.scss']
})
export class EditOrgComponent implements OnInit {

  organization$: Observable<Organization>;
  saving$: Observable<boolean>;
  organizationInfo = new Organization();

  orgForm: FormGroup;

  orgId: string;

  get imageFormat() {
    return {
      posX: this.organizationInfo.posX,
      posY: this.organizationInfo.posY,
      scale: this.organizationInfo.scale,
      rot: this.organizationInfo.rot
    };
  }

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.organization$ = this.store.pipe(select(getOrganization));
    this.saving$ = this.store.pipe(select(getOrganizationSaving));
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetOrg(params.id));
      this.orgId = params.id;
    });
    this.organization$.subscribe(res => {
      if (res && res.name) {
        this.organizationInfo = res;
        this.updateForm();
      }
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    if (this.orgForm) {
      this.orgForm.setValue({
        name: this.organizationInfo.name || '',
        address: this.organizationInfo.address || '',
        description: this.organizationInfo.description || ''
      });
    } else {
      this.orgForm = this.fb.group({
        name: [this.organizationInfo.name || '', Validators.required],
        address: this.organizationInfo.address || '',
        description: this.organizationInfo.description || ''
      });
    }
  }

  onSave() {
    if (this.orgForm.dirty) {
      const payload = {
        id: this.orgId,
        body: this.orgForm.value
      };
      this.store.dispatch(new UpdateOrg(payload));
      const sub = this.store.pipe(select(getOrganizationSaved)).subscribe(res => {
        if (res) {
          sub.unsubscribe();
          this.router.navigate(['organization', this.orgId]);
        }
      });
    } else {
      this.router.navigate(['organization', this.orgId]);
    }
  }

  onRemove(payload) {
    this.store.dispatch(new RemoveOrgImage(payload));
  }

}
