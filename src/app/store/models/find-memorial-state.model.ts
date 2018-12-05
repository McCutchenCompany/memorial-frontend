export class FindUserPositionState {
  loading: boolean;
  loaded: boolean;
  position: UserCoordinates;
}

export class UserCoordinates {
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: number;
}
