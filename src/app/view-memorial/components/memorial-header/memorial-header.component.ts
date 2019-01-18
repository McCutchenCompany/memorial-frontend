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

  get imgBackground() {
    if (this.memorial.image) {
      return {
        background: `url(${environment.s3.url}${this.memorial.image})`,
        repeat: 'no-repeat',
        position: `${this.memorial.posX.toString()}px ${this.memorial.posY.toString()}px`,
        size: `cover`,
        scale: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.memorial.scale / 100}) rotate(${this.memorial.rot}deg)`)
      };
    } else {
      return {
        background: 'url(assets/imgs/default-memorial.jpg)',
        position: 'center',
        repeat: 'no-repeat',
        size: 'cover'
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
