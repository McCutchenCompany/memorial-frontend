import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CreateOrg } from '@store/organization/organization.actions';
import { getOrganizationSaving } from '@store/organization/organization.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss']
})
export class CreateOrgComponent implements OnInit {

  orgForm: FormGroup;

  saving$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.saving$ = this.store.pipe(select(getOrganizationSaving));
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.orgForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      address: ''
    });
  }

  onSubmit() {
    this.store.dispatch(new CreateOrg(this.orgForm.value));
  }

}
