import { Component, Input, OnInit } from '@angular/core';
import { Organization } from '@shared/models/organization.model';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {

  @Input() organization: Organization;

  constructor() { }

  ngOnInit() {
  }

}
