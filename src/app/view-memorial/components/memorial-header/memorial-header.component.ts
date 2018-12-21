import { Component, Input, OnInit } from '@angular/core';
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
        background: `url(${environment.s3.url}${encodeURI(this.memorial.image)})`,
        position: 'center',
        repeat: 'no-repeat',
        size: 'cover'
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
  constructor() { }

  ngOnInit() {
  }

}
