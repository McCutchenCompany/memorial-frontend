import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { Memorial } from '@shared/models/memorial.model';

@Component({
  selector: 'app-memorial-header',
  templateUrl: './memorial-header.component.html',
  styleUrls: ['./memorial-header.component.scss']
})
export class MemorialHeaderComponent implements OnInit {

  @Input() memorial: Memorial;

  get name() {
    let name = '';
    if (this.memorial.first_name) {
      name += `${this.memorial.first_name}`;
    }
    if (this.memorial.middle_name) {
      name += ` ${this.memorial.middle_name}`;
    }
    if (this.memorial.last_name) {
      name += ` ${this.memorial.last_name}`;
    }
    return name;
  }

  get imgFormat() {
    if (this.memorial.image) {
      return {
        src: `${environment.s3.url}${this.memorial.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.memorial.scale / 100})
          rotate(${this.memorial.rot}deg)
          translate(${this.memorial.posX.toString()}px, ${this.memorial.posY.toString()}px)`
        )
      };
    } else {
      return {
        src: 'assets/imgs/default-memorial.jpeg',
        transform: ''
      };
    }
  }

  get imgFormatTablet() {
    if (this.memorial.image) {
      return {
        src: `${environment.s3.url}${this.memorial.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.memorial.scale / 100})
          rotate(${this.memorial.rot}deg)
          translate(${(this.memorial.posX * 2.4).toString()}px, ${(this.memorial.posY * 2.4).toString()}px)`
        )
      };
    } else {
      return {
        src: 'assets/imgs/default-memorial.jpeg',
        transform: ''
      };
    }
  }

  get imgFormatDesktop() {
    if (this.memorial.image) {
      return {
        src: `${environment.s3.url}${this.memorial.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.memorial.scale / 100})
          rotate(${this.memorial.rot}deg)
          translate(${(this.memorial.posX * 4).toString()}px, ${(this.memorial.posY * 4).toString()}px)`
        )
      };
    } else {
      return {
        src: 'assets/imgs/default-memorial.jpeg',
        transform: ''
      };
    }
  }

  constructor(
    private meta: Meta,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.updateMeta();
  }

  updateMeta() {
    this.meta.updateTag({ property: 'og:title', content: this.name });
    this.meta.updateTag({ property: 'og:image', content: `${environment.s3.url}${this.memorial.image}`});
    this.meta.updateTag({ property: 'og:url', content: `${environment.url}memorials/${this.memorial.uuid}`});
  }

}
