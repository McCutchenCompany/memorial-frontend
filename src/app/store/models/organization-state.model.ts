import { Organization } from './../../shared/models/organization.model';

export class OrganizationState {
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  error: any;
  organization: Organization;
}
