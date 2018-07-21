import { Action } from '@ngrx/store';

import { findMemorialActionTypes as actionTypes } from './action.types';

export class GetPositionAction implements Action {
  readonly type = actionTypes.GET_POSITION;

  constructor(public payload: any) {}
}
