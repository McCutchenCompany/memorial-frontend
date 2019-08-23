import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MilitaryHistory } from './../../../shared/models/military.model';

@Component({
  selector: 'app-medal-picker',
  templateUrl: './medal-picker.component.html',
  styleUrls: ['./medal-picker.component.scss']
})
export class MedalPickerComponent implements OnInit, OnChanges {

  @Input() medals: any[];
  @Input() branch: string;
  @Input() history: MilitaryHistory;
  @Input() saving: boolean;

  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  search: FormGroup;

  selectedMedals = [];

  get filterMedals() {
    return this.medals.filter(medal => {
      const name = medal.name.toLowerCase();
      const query = this.search.value.query.toLowerCase();
      if (name.indexOf(query) > -1) {
        return true;
      } else {
        return false;
      }
    });
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    this.findMedals();
  }

  buildForm() {
    this.search = this.fb.group({
      query: ''
    });
  }

  findMedals() {
    this.selectedMedals = [];
    this.history.mem_military_branches_medals.forEach(res => {
      this.selectedMedals.push(res.medal.uuid);
    });
  }

  addMedal(medal_id: string) {
    const body = {
      medal_id,
      branch_id: this.branch
    };
    this.selectedMedals.push(medal_id);
    this.add.emit(body);
  }

  removeMedal(medal_id: string) {
    const index = this.history.mem_military_branches_medals.findIndex(res => {
      return res.medal.uuid === medal_id;
    });
    if (index > -1) {
      this.remove.emit(this.history.mem_military_branches_medals[index].uuid);
    }
  }

}
