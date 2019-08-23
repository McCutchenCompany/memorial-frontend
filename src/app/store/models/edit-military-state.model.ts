export class EditMilitaryState {
  branches: {
    loading: boolean;
    loaded: boolean;
    error: any;
    results: any[]
  };
  medals: {
    loading: boolean;
    loaded: boolean;
    error: any;
    branchId: string;
    results: any[];
  };
}
