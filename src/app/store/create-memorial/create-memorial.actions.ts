import { Action } from '@ngrx/store';



export enum CreateMemorialActionTypes {
  GET_CREATE_MEMORIAL = '[Create] Get create memorial',
  GET_CREATE_MEMORIAL_SUCCESS = '[Create] Get create memorial success',
  GET_CREATE_MEMORIAL_FAILURE = '[Create] Get create memorial failure',
  UPDATE_CREATE_MEMORIAL = '[Create] Update create memorial',
  UPDATE_CREATE_MEMORIAL_SUCCESS = '[Create] Update create memorial success',
  UPDATE_CREATE_MEMORIAL_FAILURE = '[Create] Update create memorial failure',
  ADD_TIMELINE_ENTRY = '[Create] Add timeline entry',
  ADD_TIMELINE_ENTRY_SUCCESS = '[Create] Add timeline entry success',
  ADD_TIMELINE_ENTRY_FAILURE = '[Create] Add timeline entry failure',
  REMOVE_TIMELINE_ENTRY = '[Create] Remove timeline entry',
  REMOVE_TIMELINE_ENTRY_SUCCESS = '[Create] Remove timeline entry success',
  REMOVE_TIMELINE_ENTRY_FAILURE = '[Create] Remove timeline entry failure'
}

export class GetCreateMemorial implements Action {
  readonly type = CreateMemorialActionTypes.GET_CREATE_MEMORIAL;
  constructor (public payload: any) {}
}
export class GetCreateMemorialSuccess implements Action {
  readonly type = CreateMemorialActionTypes.GET_CREATE_MEMORIAL_SUCCESS;
  constructor (public payload: any) {}
}
export class GetCreateMemorialFailure implements Action {
  readonly type = CreateMemorialActionTypes.GET_CREATE_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateCreateMemorial implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL;
  constructor (public payload: any) {}
}
export class UpdateCreateMemorialSuccess implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL_SUCCESS;
  constructor (public payload: any) {}
}
export class UpdateCreateMemorialFailure implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_CREATE_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export class AddTimelineEntry implements Action {
  readonly type = CreateMemorialActionTypes.ADD_TIMELINE_ENTRY;
  constructor (public payload: any) {}
}
export class AddTimelineEntrySuccess implements Action {
  readonly type = CreateMemorialActionTypes.ADD_TIMELINE_ENTRY_SUCCESS;
  constructor (public payload: any) {}
}
export class AddTimelineEntryFaiure implements Action {
  readonly type = CreateMemorialActionTypes.ADD_TIMELINE_ENTRY_FAILURE;
  constructor (public payload: any) {}
}

export class RemoveTimelineEntry implements Action {
  readonly type = CreateMemorialActionTypes.REMOVE_TIMELINE_ENTRY;
  constructor (public payload: any) {}
}
export class RemoveTimelineEntrySuccess implements Action {
  readonly type = CreateMemorialActionTypes.REMOVE_TIMELINE_ENTRY_SUCCESS;
  constructor (public payload: any) {}
}
export class RemoveTimelineEntryFaiure implements Action {
  readonly type = CreateMemorialActionTypes.REMOVE_TIMELINE_ENTRY_FAILURE;
  constructor (public payload: any) {}
}

export type All =
  | GetCreateMemorial
  | GetCreateMemorialSuccess
  | GetCreateMemorialFailure
  | UpdateCreateMemorial
  | UpdateCreateMemorialSuccess
  | UpdateCreateMemorialFailure
  | AddTimelineEntry
  | AddTimelineEntrySuccess
  | AddTimelineEntryFaiure
  | RemoveTimelineEntry
  | RemoveTimelineEntrySuccess
  | RemoveTimelineEntryFaiure;
