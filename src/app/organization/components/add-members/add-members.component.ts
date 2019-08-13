import { Component, Input, OnInit } from '@angular/core';
import { Organization } from '@shared/models/organization.model';

import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit {

  @Input() organization: Organization;

  get join_link() {
    return `${environment.url}join-org/${this.organization.invite_link}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
