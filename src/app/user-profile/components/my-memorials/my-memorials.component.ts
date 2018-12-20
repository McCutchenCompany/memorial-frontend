import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Memorial } from '@shared/models/memorial.model';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-my-memorials',
  templateUrl: './my-memorials.component.html',
  styleUrls: ['./my-memorials.component.scss']
})
export class MyMemorialsComponent implements OnInit {

  @Input() memorials: Memorial[];
  @Input() user: User;
  @Output() addLicense: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onAddMemorial() {
    const payload = {
      licenses: this.user.licenses + 1,
      uuid: this.user.uuid
    };
    this.addLicense.emit(payload);
  }

}
