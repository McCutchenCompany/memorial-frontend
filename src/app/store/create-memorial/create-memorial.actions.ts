import { Action } from '@ngrx/store';

import { Timeline } from './../../shared/models/timeline.model';



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
  REMOVE_TIMELINE_ENTRY_FAILURE = '[Create] Remove timeline entry failure',
  UPDATE_TIMELINE = '[Create] Update timeline',
  UPDATE_TIMELINE_SUCCESS = '[Create] Update timeline success',
  UPDATE_TIMELINE_FAILURE = '[Create] Update timeline failure',
  UPDATE_SINGLE_TIMELINE = '[Create] Update single timeline',
  UPDATE_SINGLE_TIMELINE_SUCCESS = '[Create] Update single timeline success',
  UPDATE_SINGLE_TIMELINE_FAILURE = '[Create] Update single timeline failure',
  UPDATE_LOCATION = '[Create] Update location',
  UPDATE_LOCATION_SUCCESS = '[Create] Update location success',
  UPDATE_LOCATION_FAILURE = '[Create] Update location failure',
  UPLOAD_MEMORIAL_IMAGE = '[Create] Upload memorial image',
  UPLOAD_MEMORIAL_IMAGE_SUCCESS = '[Create] Upload memorial image success',
  UPLOAD_MEMORIAL_IMAGE_FAILURE = '[Create] Upload memorial image failure',
  DELETE_MEMORIAL_IMAGE = '[Create] Delete memorial image',
  DELETE_MEMORIAL_IMAGE_SUCCESS = '[Create] Delete memorial image success',
  DELETE_MEMORIAL_IMAGE_FAILURE = '[Create] Delete memorial image failure',
  REPLACE_MEMORIAL_IMAGE = '[Create] Replace memorial image',
  REPLACE_MEMORIAL_IMAGE_SUCCESS = '[Create] Replace memorial image success',
  REPLACE_MEMORIAL_IMAGE_FAILURE = '[Create] Replace memorial image failure',
  UPLOAD_TIMELINE_FILE = '[Create] Upload timeline file',
  UPLOAD_TIMELINE_FILE_SUCCESS = '[Create] Upload timeline file success',
  UPLOAD_TIMELINE_FILE_FAILURE = '[Create] Upload timeline file failure',
  REMOVE_TIMELINE_FILE = '[Create] Remove timeline file',
  REMOVE_TIMELINE_FILE_SUCCESS = '[Create] Remove timeline file success',
  REMOVE_TIMELINE_FILE_FAILURE = '[Create] Remove timeline file failure',
  REPLACE_TIMELINE_FILE = '[Create] Replace timeline file',
  REPLACE_TIMELINE_FILE_SUCCESS = '[Create] Replace timeline file success',
  REPLACE_TIMELINE_FILE_FAILURE = '[Create] Replace timeline file failure',
  SET_EDITING_TIMELINE = '[Create] Set editing timeline',
  SEARCH_ADDRESS = '[Create] Search Address',
  SEARCH_ADDRESS_SUCCESS = '[Create] Search Address success',
  SEARCH_ADDRESS_FAILURE = '[Create] Search Address failure',
  UPDATE_MEMORY_STATUS = '[Create] Update Memory status',
  UPDATE_MEMORY_STATUS_SUCCESS = '[Create] Update Memory status success',
  UPDATE_MEMORY_STATUS_FAILURE = '[Create] Update Memory status failure'
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

export class UpdateTimeline implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_TIMELINE;
  constructor (public payload: {memorial_id: string, timelines: any[]}) {}
}
export class UpdateTimelineSuccess implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_TIMELINE_SUCCESS;
  constructor (public payload: Timeline[]) {}
}
export class UpdateTimelineFailure implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_TIMELINE_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateSingleTimeline implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_SINGLE_TIMELINE;
  constructor(public payload: {timeline_id: string, body: any}) {}
}
export class UpdateSingleTimelineSuccess implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_SINGLE_TIMELINE_SUCCESS;
  constructor (public payload: any) {}
}
export class UPdateSingleTimelineFailure implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_SINGLE_TIMELINE_FAILURE;
  constructor (public payload: any) {}
}

export class UploadMemorialImage implements Action {
  readonly type = CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE;
  constructor (public payload: any) {}
}
export class UploadMemorialImageSuccess implements Action {
  readonly type = CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE_SUCCESS;
  constructor (public payload: any) {}
}
export class UploadMemorialImageFailure implements Action {
  readonly type = CreateMemorialActionTypes.UPLOAD_MEMORIAL_IMAGE_FAILURE;
  constructor (public payload: any) {}
}

export class DeleteMemorialImage implements Action {
  readonly type = CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE;
  constructor (public payload: {id: string, route: string}) {}
}
export class DeleteMemorialImageSuccess implements Action {
  readonly type = CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE_SUCCESS;
  constructor (public payload: any) {}
}
export class DeleteMemorialImageFailure implements Action {
  readonly type = CreateMemorialActionTypes.DELETE_MEMORIAL_IMAGE_FAILURE;
  constructor (public payload: any) {}
}

export class ReplaceMemorialImage implements Action {
  readonly type = CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE;
  constructor (public payload: any) {}
}
export class ReplaceMemorialImageSuccess implements Action {
  readonly type = CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE_SUCCESS;
  constructor (public payload: any) {}
}
export class ReplaceMemorialImageFailure implements Action {
  readonly type = CreateMemorialActionTypes.REPLACE_MEMORIAL_IMAGE_FAILURE;
  constructor (public payload: any) {}
}

export class UploadTimelineFile implements Action {
  readonly type = CreateMemorialActionTypes.UPLOAD_TIMELINE_FILE;
  constructor (public payload: any) {}
}
export class UploadTimelineFileSuccess implements Action {
  readonly type = CreateMemorialActionTypes.UPLOAD_TIMELINE_FILE_SUCCESS;
  constructor (public payload: any) {}
}
export class UploadTimelineFileFailure implements Action {
  readonly type = CreateMemorialActionTypes.UPLOAD_TIMELINE_FILE_FAILURE;
  constructor (public payload: any) {}
}


export class ReplaceTimelineFile implements Action {
  readonly type = CreateMemorialActionTypes.REPLACE_TIMELINE_FILE;
  constructor (public payload: any) {}
}
export class ReplaceTimelineFileSuccess implements Action {
  readonly type = CreateMemorialActionTypes.REPLACE_TIMELINE_FILE_SUCCESS;
  constructor (public payload: any) {}
}
export class ReplaceTimelineFileFailure implements Action {
  readonly type = CreateMemorialActionTypes.REPLACE_TIMELINE_FILE_FAILURE;
  constructor (public payload: any) {}
}

export class RemoveTimelineFile implements Action {
  readonly type = CreateMemorialActionTypes.REMOVE_TIMELINE_FILE;
  constructor (public payload: any) {}
}
export class RemoveTimelineFileSuccess implements Action {
  readonly type = CreateMemorialActionTypes.REMOVE_TIMELINE_FILE_SUCCESS;
  constructor (public payload: any) {}
}
export class RemoveTimelineFileFailure implements Action {
  readonly type = CreateMemorialActionTypes.REMOVE_TIMELINE_FILE_FAILURE;
  constructor (public payload: any) {}
}

export class SetEditingTimeline implements Action {
  readonly type = CreateMemorialActionTypes.SET_EDITING_TIMELINE;
  constructor (public payload: string[]) {}
}

export class SearchAddress implements Action {
  readonly type = CreateMemorialActionTypes.SEARCH_ADDRESS;
  constructor (public payload: string) {}
}
export class SearchAddressSuccess implements Action {
  readonly type = CreateMemorialActionTypes.SEARCH_ADDRESS_SUCCESS;
  constructor (public payload: any) {}
}
export class SearchAddressFailure implements Action {
  readonly type = CreateMemorialActionTypes.SEARCH_ADDRESS_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateLocation implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_LOCATION;
  constructor (public payload: {id: string, location: {latitude: number, longitude: number}}) {}
}
export class UpdateLocationSuccess implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_LOCATION_SUCCESS;
  constructor (public payload: any) {}
}
export class UpdateLocationFailure implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_LOCATION_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateMemoryStatus implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_MEMORY_STATUS;
  constructor (public payload: {memory_id: string, body: any}) {}
}
export class UpdateMemoryStatusSuccess implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_MEMORY_STATUS_SUCCESS;
  constructor (public payload: any) {}
}
export class UpdateMemoryStatusFailure implements Action {
  readonly type = CreateMemorialActionTypes.UPDATE_MEMORY_STATUS_FAILURE;
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
  | RemoveTimelineEntryFaiure
  | UpdateTimeline
  | UpdateTimelineSuccess
  | UpdateTimelineFailure
  | UpdateSingleTimeline
  | UpdateSingleTimelineSuccess
  | UPdateSingleTimelineFailure
  | UploadMemorialImage
  | UploadMemorialImageSuccess
  | UploadMemorialImageFailure
  | DeleteMemorialImage
  | DeleteMemorialImageSuccess
  | DeleteMemorialImageFailure
  | ReplaceMemorialImage
  | ReplaceMemorialImageSuccess
  | ReplaceMemorialImageFailure
  | UploadTimelineFile
  | UploadTimelineFileSuccess
  | UploadTimelineFileFailure
  | ReplaceTimelineFile
  | ReplaceTimelineFileSuccess
  | ReplaceTimelineFileFailure
  | RemoveTimelineFile
  | RemoveTimelineFileSuccess
  | RemoveTimelineFileFailure
  | SetEditingTimeline
  | SearchAddress
  | SearchAddressSuccess
  | SearchAddressFailure
  | UpdateLocation
  | UpdateLocationSuccess
  | UpdateLocationFailure
  | UpdateMemoryStatus
  | UpdateMemoryStatusSuccess
  | UpdateMemoryStatusFailure;
