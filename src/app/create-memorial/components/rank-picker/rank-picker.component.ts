import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UpdateBranchRank } from '@store/military-history/military-history.actions';

import { MilitaryHistory } from './../../../shared/models/military.model';

@Component({
  selector: 'app-rank-picker',
  templateUrl: './rank-picker.component.html',
  styleUrls: ['./rank-picker.component.scss']
})
export class RankPickerComponent implements OnInit {

  @Input() ranks: any[];
  @Input() history: MilitaryHistory;

  rankForm: FormGroup;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.rankForm = this.fb.group({
      rank: this.history.military_rank ? this.history.military_rank.uuid : ''
    });
  }

  onSelect(event) {
    const payload = {
      memorial_military_branch_id: this.history.uuid,
      military_rank_id: event.value
    };
    this.store.dispatch(new UpdateBranchRank(payload));
  }

}
