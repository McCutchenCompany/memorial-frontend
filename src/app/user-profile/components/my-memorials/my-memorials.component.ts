import { Component, Input, OnInit } from '@angular/core';
import { Memorial } from '@shared/models/memorial.model';

@Component({
  selector: 'app-my-memorials',
  templateUrl: './my-memorials.component.html',
  styleUrls: ['./my-memorials.component.scss']
})
export class MyMemorialsComponent implements OnInit {

  @Input() memorials: Memorial[];

  constructor() { }

  ngOnInit() {
  }

}
