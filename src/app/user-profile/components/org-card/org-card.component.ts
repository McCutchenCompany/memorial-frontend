import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
      return {
        src: `${environment.s3.url}${this.organization.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.organization.scale / 100})
          rotate(${this.organization.rot}deg)
          translate(${this.organization.posX.toString()}px, ${this.organization.posY.toString()}px)`
        )
      };
    } else {
      return {
        src: 'assets/imgs/location.jpeg',
        transform: ''
      };
    }
  }

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  onHover() {
    this.isHover = !this.isHover;
  }

}
