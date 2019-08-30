import { MilitaryHistory } from '@shared/models/military.model';
import { Photo } from '@shared/models/photo.model';

import { LocationMarker } from './../../shared/models/location-marker.model';
import { Memorial } from './../../shared/models/memorial.model';
import { Timeline } from './../../shared/models/timeline.model';

export class ViewMemorialState {
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  selectedMemorial: {
    memorial: Memorial;
    location: LocationMarker;
    timeline: Timeline[];
    military: MilitaryHistory[];
    album: {count: number; photos: Photo[]};
  };
  error: any;
}
