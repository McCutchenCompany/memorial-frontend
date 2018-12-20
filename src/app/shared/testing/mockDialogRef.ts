import { Observable, of } from 'rxjs';

export class MockMatDialogRef {
  close() {
    return;
  }
  open() {
    return {
      afterClosed: () => of('closed')
    };
  }
  backdropClick(): Observable<any> {
    return of({});
  }
}
