import { Action } from '@ngrx/store';
import { LocationRange } from '@shared/models/location-range.model';

export const findMemorialActionTypes = {
  GET_POSITION: '[Find Memorial] Get Current Position',
  GET_IN_RANGE: '[Find Memorial] Get in range',
  GET_IN_RANGE_SUCCESS: '[Find Memorial] Get in range success',
  GET_IN_RANGE_FAILURE: '[Find Memorial] Get in range failure'
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

export type All =
  | GetPositionAction
  | GetInRange
  | GetInRangeSuccess
  | GetInRangeFailure;
