import { Organization } from '@shared/models/organization.model';

export class AuthState {
  isAuthenticated: boolean;
  token: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    uuid: string;
    licenses: number;
    licenses_in_use: number;
    auth0_id: string;
    updated_at: Date;
    created_at: Date;
    a0: any;
    memorials: any[],
    organizations: Organization[]
  };
  error: any;
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
}
