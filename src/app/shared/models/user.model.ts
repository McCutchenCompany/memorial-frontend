import { Memorial } from '@shared/models/memorial.model';

export class User {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  licenses: number;
  licenses_in_use: number;
  auth0_id: string;
  created_at: Date;
  updated_at: Date;
  a0: any;
  memorials: Memorial[];
}
