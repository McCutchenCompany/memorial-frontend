import { Component, Input, OnInit } from '@angular/core';
import { Memorial } from '@shared/models/memorial.model';

@Component({
  selector: 'app-my-memorial-card',
  templateUrl: './my-memorial-card.component.html',
  styleUrls: ['./my-memorial-card.component.scss']
})
export class MyMemorialCardComponent implements OnInit {

  @Input() memorial: Memorial;

  get imgBackground() {
    if (this.memorial.image) {
      return {
        background: `url(${this.memorial.image})`,
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
    if (name === '') {
      name = 'New Memorial';
    }
    return name;
  }

  constructor() { }

  ngOnInit() {
  }

}
