import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { LocationMarker } from '@shared/models/location-marker.model';
import { Memorial } from '@shared/models/memorial.model';

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

  shareFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u='
    + `${environment.url}memorial/0761353d-5c91-4d4d-87f0-b663952b5d93`, '_blank', 'width=500, height=300');
  }

}
