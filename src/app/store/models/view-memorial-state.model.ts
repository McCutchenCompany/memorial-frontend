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
  };
  error: any;
}
