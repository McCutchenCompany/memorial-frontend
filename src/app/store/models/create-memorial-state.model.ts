import { Memorial } from '@shared/models/memorial.model';

export class CreateMemorialState {
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  memorial: Memorial;
  error: any;
}
