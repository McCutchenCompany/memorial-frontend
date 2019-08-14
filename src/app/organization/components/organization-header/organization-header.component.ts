import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Organization } from '@shared/models/organization.model';

import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-organization-header',
  templateUrl: './organization-header.component.html',
  styleUrls: ['./organization-header.component.scss']
})
export class OrganizationHeaderComponent implements OnInit {

  @Input() organization: Organization;


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

  get imgFormatTablet() {
    if (this.organization.image) {
      return {
        src: `${environment.s3.url}${this.organization.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.organization.scale / 100})
          rotate(${this.organization.rot}deg)
          translate(${(this.organization.posX * 2.4).toString()}px, ${(this.organization.posY * 2.4).toString()}px)`
        )
      };
    } else {
      return {
        src: 'assets/imgs/location.jpeg',
        transform: ''
      };
    }
  }

  get imgFormatDesktop() {
    if (this.organization.image) {
      return {
        src: `${environment.s3.url}${this.organization.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.organization.scale / 100})
          rotate(${this.organization.rot}deg)
          translate(${(this.organization.posX * 4).toString()}px, ${(this.organization.posY * 4).toString()}px)`
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
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToEdit() {
    this.router.navigate(['organization', this.organization.uuid, 'edit']);
  }

}
