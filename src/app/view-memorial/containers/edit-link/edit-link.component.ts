import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getRouterState } from '@store/router/router.reducer';
import { JoinMemorial } from '@store/view-memorial/view-memorial.actions';

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.scss']
})
export class EditLinkComponent implements OnInit {

  joinLink: string;

  constructor(
    private store: Store<any>
  ) {
    this.store.pipe(select(getRouterState)).subscribe(route => {
      if (route.state.root.children[0].children[0].params && !this.joinLink) {
        this.joinLink = route.state.root.children[0].children[0].params.id;
        this.store.dispatch(new JoinMemorial(route.state.root.children[0].children[0].params.id));
      }
    });
  }

  ngOnInit() {
  }

}
