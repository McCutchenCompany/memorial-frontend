import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment.staging';
import { LocationMarker } from '@shared/models/location-marker.model';
import { Memorial } from '@shared/models/memorial.model';
import { GoogleAnalyticsService } from '@shared/services/google-analytics.service';

@Component({
  selector: 'app-memorial-info',
  templateUrl: './memorial-info.component.html',
  styleUrls: ['./memorial-info.component.scss']
})
export class MemorialInfoComponent implements OnInit {

  @Input() memorial: Memorial;
  @Input() location: LocationMarker;

  constructor(
    private analytics: GoogleAnalyticsService
  ) { }

  ngOnInit() {
  }

  shareFacebook() {
    this.analytics.sendEvent(`Facebook: ${this.memorial.uuid}`, 'Shared', 'Facebook');
    const body = {
      'og:url': `https://staging.mymemorial.co/memorial/${this.memorial.uuid}`,
      'og:title': `${this.memorial.first_name} ${this.memorial.last_name}`,
      'og:description': `See this tribute to ${this.memorial.first_name}'s life and share your memories.`,
      'og:image': `${environment.s3.url}${this.memorial.image}`
    };
    const encoded = encodeURI(JSON.stringify(body));
    window.open(`https://www.facebook.com/v2.10/dialog/share_open_graph`
    + `?action_properties=%7B%22object%22%3A${encoded.replace(/\//g, '%2F')}%7D`
    + `&action_type=og.shares&app_id=275993089758559`
    + `&redirect_uri=https://staging.mymemorial.co/memorial/${this.memorial.uuid}`,
    '_blank', 'width=700, height=700');
  }

  sharePinterest() {
    this.analytics.sendEvent(`Pinterest: ${this.memorial.uuid}`, 'Shared', 'Pinterest');
    window['PinUtils'].pinOne({
      url: `https://staging.mymemorial.co/memorial/${this.memorial.uuid}`,
      media: `${environment.s3.url}${this.memorial.image}`,
      description: `A Memorial to ${this.memorial.first_name} ${this.memorial.last_name}.`
    });
  }

}
