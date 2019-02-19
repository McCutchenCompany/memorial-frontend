import { Action } from '@ngrx/store';
import { LocationRange } from '@shared/models/location-range.model';

import { Memorial } from './../../../shared/models/memorial.model';

export const findMemorialActionTypes = {
  GET_POSITION: '[Find Memorial] Get Current Position',
  GET_IN_RANGE: '[Find Memorial] Get in range',
  GET_IN_RANGE_SUCCESS: '[Find Memorial] Get in range success',
  GET_IN_RANGE_FAILURE: '[Find Memorial] Get in range failure',
  GET_SELECTED_MARKER: '[Find Memorial] Get selected marker',
  GET_SELECTED_MARKER_SUCCESS: '[Find Memorial] Get selected marker success',
  GET_SELECTED_MARKER_FAILURE: '[Find Memorial] Get selected marker failure',
  LOCATION_DENIED: '[Find Memorial] Location denied',
  LOCATION_ACCEPTED: '[Find Memorial] Location accepted',
  SEARCH_MEMORIALS: '[Find Memorials] Search memorials',
  SEARCH_MEMORIALS_SUCCESS: '[Find Memorials] Search memorials success',
  SEARCH_MEMORIALS_FAILURE: '[Find Memorials] Search memorials failure',
  GET_POPULAR_MEMORIALS: '[Find Memorials] Get popular memorials',
  GET_POPULAR_MEMORIALS_SUCCESS: '[Find Memorials] Get popular memorials success',
  GET_POPULAR_MEMORIALS_FAILURE: '[Find Memorials] Get popular memorials failure',
  CLEAR_SEARCH_MEMORIALS: '[Find Memorials] Clear search memorials'
};

export class GetPositionAction implements Action {
  readonly type = findMemorialActionTypes.GET_POSITION;

  constructor(public payload: any) {}
}
export class GetInRange implements Action {
  readonly type = findMemorialActionTypes.GET_IN_RANGE;
  constructor (public payload: LocationRange) {}
}
export class GetInRangeSuccess implements Action {
  readonly type = findMemorialActionTypes.GET_IN_RANGE_SUCCESS;
  constructor (public payload: any) {}
}
export class GetInRangeFailure implements Action {
  readonly type = findMemorialActionTypes.GET_IN_RANGE_FAILURE;
  constructor (public payload: any) {}
}

export class GetSelectedMarker implements Action {
  readonly type = findMemorialActionTypes.GET_SELECTED_MARKER;
  constructor (public payload: any) {}
}
export class GetSelectedMarkerSuccess implements Action {
  readonly type = findMemorialActionTypes.GET_SELECTED_MARKER_SUCCESS;
  constructor (public payload: any) {}
}
export class GetSelectedMarkerFailure implements Action {
  readonly type = findMemorialActionTypes.GET_SELECTED_MARKER_FAILURE;
  constructor (public payload: any) {}
}

export class LocationDenied implements Action {
  readonly type = findMemorialActionTypes.LOCATION_DENIED;
}
export class LocationAccepted implements Action {
  readonly type = findMemorialActionTypes.LOCATION_ACCEPTED;
}

export class SearchMemorials implements Action {
  readonly type = findMemorialActionTypes.SEARCH_MEMORIALS;
  constructor (public payload: string) {}
}
export class SearchMemorialsSuccess implements Action {
  readonly type = findMemorialActionTypes.SEARCH_MEMORIALS_SUCCESS;
  constructor (public payload: Memorial[]) {}
}
export class SearchMemorialsFailure implements Action {
  readonly type = findMemorialActionTypes.SEARCH_MEMORIALS_FAILURE;
  constructor (public payload: any) {}
}

export class GetPopularMemorials implements Action {
  readonly type = findMemorialActionTypes.GET_POPULAR_MEMORIALS;
}
export class GetPopularMemorialsSuccess implements Action {
  readonly type = findMemorialActionTypes.GET_POPULAR_MEMORIALS_SUCCESS;
  constructor (public payload: any) {}
}
export class GetPopularMemorialsFailure implements Action {
  readonly type = findMemorialActionTypes.GET_POPULAR_MEMORIALS_FAILURE;
  constructor (public payload: any) {}
}

export class ClearSearchMemorials implements Action {
  readonly type = findMemorialActionTypes.CLEAR_SEARCH_MEMORIALS;
}

export type All =
  | GetPositionAction
  | GetInRange
  | GetInRangeSuccess
  | GetInRangeFailure
  | LocationDenied
  | LocationAccepted
  | SearchMemorials
  | SearchMemorialsSuccess
  | SearchMemorialsFailure
  | GetPopularMemorials
  | GetPopularMemorialsSuccess
  | GetPopularMemorialsFailure
  | ClearSearchMemorials;
