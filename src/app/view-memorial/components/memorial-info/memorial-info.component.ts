import { Component, Input, OnInit } from '@angular/core';
import { LocationMarker } from '@shared/models/location-marker.model';

import { Memorial } from './../../../shared/models/memorial.model';

@Component({
  selector: 'app-memorial-info',
  templateUrl: './memorial-info.component.html',
  styleUrls: ['./memorial-info.component.scss']
})
export class MemorialInfoComponent implements OnInit {

  @Input() memorial: Memorial;
  @Input() location: LocationMarker;

  constructor() { }

  ngOnInit() {
  }

}
