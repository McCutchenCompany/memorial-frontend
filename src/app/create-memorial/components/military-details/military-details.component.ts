import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MilitaryHistory } from '@shared/models/military.model';

@Component({
  selector: 'app-military-details',
  templateUrl: './military-details.component.html',
  styleUrls: ['./military-details.component.scss']
})
export class MilitaryDetailsComponent implements OnInit {

  @Input() history: MilitaryHistory;
  @Input() saving: boolean;
  @Input() ranks: any[];

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  datesForm: FormGroup;

  maxDate;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.maxDate = new Date();
  }

  buildForm() {
    this.datesForm = this.fb.group({
      start_date: this.history.start_date,
      end_date: this.history.end_date
    });
  }

  onSave() {
    const event = {
      id: this.history.uuid,
      body: this.datesForm.value
    };
    this.save.emit(event);
    this.datesForm.markAsPristine();
  }

}
