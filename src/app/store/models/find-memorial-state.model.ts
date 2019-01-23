export class FindUserPositionState {
  loading: boolean;
  loaded: boolean;
  position: UserCoordinates;
  permission: boolean;
  setLocation: boolean;
}

export class UserCoordinates {
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: number;
}
