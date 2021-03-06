import { Component, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material';
import { environment } from '@environments/environment';
import { Organization } from '@shared/models/organization.model';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit {

  @Input() organization: Organization;

  get join_link() {
    return `${environment.url}organization/join/${this.organization.invite_link}`;
  }

  get display_link() {
    return `${environment.url}organization/join`;
  }

  constructor() { }

  ngOnInit() {
  }


  showToolTip(tooltip: MatTooltip) {
    tooltip.message = 'Copied';
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
      tooltip.message = 'Copy';
    }, 1000);
  }

}
