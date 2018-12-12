import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ViewMemorialState } from '@store/models/view-memorial-state.model';
import { GetMemorial } from '@store/view-memorial/view-memorial.actions';
import { getViewMemorial, getViewMemorialLoaded, getViewMemorialLoading } from '@store/view-memorial/view-memorial.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-memorial',
  templateUrl: './view-memorial.component.html',
  styleUrls: ['./view-memorial.component.scss']
})
export class ViewMemorialComponent implements OnInit {

  selectedMemorial$: Observable<any>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(
    public route: ActivatedRoute,
    public store: Store<ViewMemorialState>
  ) {
    this.selectedMemorial$ = this.store.pipe(select(getViewMemorial));
    this.loading$ = this.store.pipe(select(getViewMemorialLoading));
    this.loaded$ = this.store.pipe(select(getViewMemorialLoaded));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.store.dispatch(new GetMemorial(params.id));
      }
    });
  }

}
