import { Component, Input, OnInit } from '@angular/core';
import { Organization } from '@shared/models/organization.model';

@Component({
  selector: 'app-user-orgs',
  templateUrl: './user-orgs.component.html',
  styleUrls: ['./user-orgs.component.scss']
})
export class UserOrgsComponent implements OnInit {

  @Input() organizations: Organization[];

  constructor() { }

  ngOnInit() {
  }

}
