import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Photo } from '@shared/models/photo.model';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.scss']
})
export class AlbumViewerComponent implements OnInit {

  @Input() photos: Photo[];

  constructor() { }

  ngOnInit() {
  }

  photoSrc(link) {
    return `${environment.s3.url}${link}`;
  }

}
