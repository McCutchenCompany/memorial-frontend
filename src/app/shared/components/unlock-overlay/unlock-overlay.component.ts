import { Component, Input, OnInit } from '@angular/core';

import { Memorial } from './../../models/memorial.model';

@Component({
  selector: 'app-unlock-overlay',
  templateUrl: './unlock-overlay.component.html',
  styleUrls: ['./unlock-overlay.component.scss']
})
export class UnlockOverlayComponent implements OnInit {

  @Input() memorial: Memorial;

  isHover = false;

  constructor() { }

  ngOnInit() {
  }

  toggleHover() {
    this.isHover = !this.isHover;
  }

}
