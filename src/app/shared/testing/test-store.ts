import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T> extends Observable<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  constructor() {
    super();
  }

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {}

  pipe(select?: (selector?) => {}) {
    if (select) {
      return this.select();
    }
  }
}
