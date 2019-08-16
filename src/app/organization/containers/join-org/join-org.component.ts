import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { JoinOrg } from '@store/organization/organization.actions';
import { getRouterState } from '@store/router';

@Component({
  selector: 'app-join-org',
  templateUrl: './join-org.component.html',
  styleUrls: ['./join-org.component.scss']
})
export class JoinOrgComponent implements OnInit {

  joinLink: string;

  constructor(
    private store: Store<any>
  ) {
    this.store.pipe(select(getRouterState)).subscribe(route => {
      if (route.state.root.children[0].children[0].params && !this.joinLink) {
        this.joinLink = route.state.root.children[0].children[0].params.id;
        this.store.dispatch(new JoinOrg(route.state.root.children[0].children[0].params.id));
      }
    });
  }

  ngOnInit() {
  }

}
