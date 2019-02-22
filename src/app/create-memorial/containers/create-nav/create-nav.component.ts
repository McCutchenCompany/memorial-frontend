import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { Memorial } from '@shared/models/memorial.model';

@Component({
  selector: 'app-create-nav',
  templateUrl: './create-nav.component.html',
  styleUrls: ['./create-nav.component.scss']
})
export class CreateNavComponent implements OnInit {

  @Input() memorial: Memorial;
  @Input() saving: boolean;
  @Output() publish: EventEmitter<boolean> = new EventEmitter<boolean>();

  get imgFormat() {
    if (this.memorial && this.memorial.image) {
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

  get name() {
    if (this.memorial) {
      if (this.memorial.first_name && this.memorial.last_name) {
        return `${this.memorial.first_name} ${this.memorial.last_name}`;
      } else if (this.memorial.first_name) {
        return `${this.memorial.first_name}`;
      } else if (this.memorial.last_name) {
        return `${this.memorial.last_name}`;
      } else {
        return `New Memorial`;
      }
    } else {
      return ``;
    }
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onTogglePublished(publish) {
    this.publish.emit(publish);
  }

}
