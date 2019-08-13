import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment.staging';
import { Organization } from '@shared/models/organization.model';

@Component({
  selector: 'app-org-card',
  templateUrl: './org-card.component.html',
  styleUrls: ['./org-card.component.scss']
})
export class OrgCardComponent implements OnInit {

  @Input() organization: Organization;

  isHover = false;
  matCard;

  get hover() {
    if (this.isHover) {
      return true;
    } else {
      return false;
    }
  }

  get imgFormat() {
    if (this.organization.image) {
      return `${environment.s3.url}${this.organization.image}`;
    } else {
      return 'assets/imgs/location.jpeg';
    }
  }

  constructor() { }

  ngOnInit() {
  }

  onHover() {
    this.isHover = !this.isHover;
  }

}
