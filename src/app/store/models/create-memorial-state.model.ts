import { Memorial } from '@shared/models/memorial.model';
import { Timeline } from '@shared/models/timeline.model';

import { LocationMarker } from './../../shared/models/location-marker.model';

export class CreateMemorialState {
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  memorial: {
    memorial: Memorial;
    location: LocationMarker;
    timeline: Timeline[];
  };
  editingTimeline: {
    editingIds: string[]
  };
  addressSearch: {
    address: string,
    latitude: number,
    longitude: number,
    zoom: number
  };
  error: any;
}
