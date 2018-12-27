import { Memorial } from '@shared/models/memorial.model';

export class CreateMemorialState {
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  memorial: Memorial;
  editingTimeline: {
    editingIds: string[]
  };
  error: any;
}
