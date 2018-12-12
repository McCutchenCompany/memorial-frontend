import { Component, Input, OnInit } from '@angular/core';
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

  get background() {
    return `url(${this.memorial.image})`;
  }

  constructor() { }

  ngOnInit() {
  }

}
