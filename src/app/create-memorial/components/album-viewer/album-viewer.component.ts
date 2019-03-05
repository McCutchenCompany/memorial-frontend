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
  @Input() total: number;

  page = 1;

  get displayPhotos() {
    const start = this.page === 1 ? 0 : ((this.page - 1) * 20) - 1;
    const end = start + 20;
    return this.photos.slice(start, end);
  }

  constructor() { }

  ngOnInit() {
  }

  photoSrc(link) {
    return `${environment.s3.url}${link}`;
  }

}
