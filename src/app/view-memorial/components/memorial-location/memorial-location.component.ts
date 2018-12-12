import { Component, Input, OnInit } from '@angular/core';
import { LocationMarker } from '@shared/models/location-marker.model';

@Component({
  selector: 'app-memorial-location',
  templateUrl: './memorial-location.component.html',
  styleUrls: ['./memorial-location.component.scss']
})
export class MemorialLocationComponent implements OnInit {

  @Input() location: LocationMarker;

  constructor() { }

  ngOnInit() {
  }

}
