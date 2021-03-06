import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AUTH0_LOGIN = '[Auth] Auth0 Universal Login',
  AUTH0_HASH_CHECK = '[Auth] Auth0 Hash Check',
  AUTH0_LOGIN_SUCCESS = '[Auth] Auth0 Login Success',
  AUTH0_LOGIN_FAILURE = '[Auth] Auth0 Login Failure',
  LOCAL_TOKEN_CHECK = '[Auth] Get Local Token',
  LOCAL_TOKEN_VALID = '[Auth] Local Token Valid',
  LOCAL_TOKEN_INVALID = '[Auth] Local Token Invalid',
  CHECK_SESSION = '[Auth] Check Session',
  GET_PROFILE = '[Auth] Get profile',
  GET_PROFILE_SUCCESS = '[Auth] Get profile success',
  GET_PROFILE_FAILURE = '[Auth] Get profile failure',
  UPDATE_PROFILE = '[Auth] Update profile',
  UPDATE_PROFILE_SUCCESS = '[Auth] Update profile success',
  UPDATE_PROFILE_FAILURE = '[Auth] Update profile failure',
  SIGNOUT = '[Auth] Sign Out',
  UPDATE_USER_MEMORIAL = '[Profile] Update user memorial',
  UPDATE_USER_MEMORIAL_SUCCESS = '[Profile] Update user memorial success',
  UPDATE_USER_MEMORIAL_FAILURE = '[Profile] Update user memorial failure'
}

// Auth 0

// Login
export class Auth0Login implements Action {
  readonly type = AuthActionTypes.AUTH0_LOGIN;
}
export class Auth0HashCheck implements Action {
  readonly type = AuthActionTypes.AUTH0_HASH_CHECK;
}
export class Auth0LoginSuccess implements Action {
  readonly type = AuthActionTypes.AUTH0_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}
export class Auth0LoginFailure implements Action {
  readonly type = AuthActionTypes.AUTH0_LOGIN_FAILURE;
  constructor(public payload: any) {}
}

// Local Token Actions
export class LocalTokenCheck implements Action {
  readonly type = AuthActionTypes.LOCAL_TOKEN_CHECK;
}

export class LocalTokenValid implements Action {
  readonly type = AuthActionTypes.LOCAL_TOKEN_VALID;
  constructor(public payload: { decodedToken: any, accessToken: string }) {}
}

export class LocalTokenInvalid implements Action {
  readonly type = AuthActionTypes.LOCAL_TOKEN_INVALID;
}

export class SignOut implements Action {
  readonly type = AuthActionTypes.SIGNOUT;
}

export class CheckSession implements Action {
  readonly type = AuthActionTypes.CHECK_SESSION;
}

export class GetProfile implements Action {
  readonly type = AuthActionTypes.GET_PROFILE;
  constructor (public payload: any) {}
}
export class GetProfileSuccess implements Action {
  readonly type = AuthActionTypes.GET_PROFILE_SUCCESS;
  constructor (public payload: any) {}
}
export class GetProfileFailure implements Action {
  readonly type = AuthActionTypes.GET_PROFILE_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateProfile implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE;
  constructor (public payload: any) {}
}
export class UpdateProfileSuccess implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE_SUCCESS;
  constructor (public payload: any) {}
}
export class UpdateProfileFailure implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE_FAILURE;
  constructor (public payload: any) {}
}

export class UpdateUserMemorial implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_MEMORIAL;
  constructor (public payload: any) {}
}
export class UpdateUserMemorialSuccess implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_MEMORIAL_SUCCESS;
  constructor (public payload: any) {}
}
export class UpdateUserMemorialFailure implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_MEMORIAL_FAILURE;
  constructor (public payload: any) {}
}

export type AuthActions =
  | LocalTokenCheck
  | LocalTokenValid
  | LocalTokenInvalid
  | SignOut
  | Auth0Login
  | Auth0LoginSuccess
  | Auth0LoginFailure
  | Auth0HashCheck
  | CheckSession
  | GetProfile
  | GetProfileSuccess
  | GetProfileFailure
  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileFailure
  | UpdateUserMemorial
  | UpdateUserMemorialSuccess
  | UpdateUserMemorialFailure;
