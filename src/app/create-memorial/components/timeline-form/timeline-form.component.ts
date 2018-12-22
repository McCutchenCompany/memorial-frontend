import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Timeline } from '@shared/models/timeline.model';
import { RemoveTimelineFile } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';

@Component({
  selector: 'app-timeline-form',
  templateUrl: './timeline-form.component.html',
  styleUrls: ['./timeline-form.component.scss']
})
export class TimelineFormComponent implements OnInit {

  @Input() timeline: Timeline;

  timelineForm: FormGroup;
  assetForm: FormGroup;

  formatOptions = [
    {value: 'MMM dd, y', display: 'Full (Jan 1, 2018)'},
    {value: 'MMM, y', display: 'Month and Year'},
    {value: 'y', display: 'Year'}
  ];

  categoryOptions = [
    {value: '0', display: 'Custom'},
    {value: '1', display: `Child's Birth`}
  ];

  assetOptions = [
    {value: 'image', display: 'Image'},
    {value: 'video', display: 'Video'},
    {value: 'audio', display: 'Audio'}
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<CreateMemorialState>
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.timelineForm = this.fb.group({
      date: [this.timeline.date || '', Validators.required],
      date_format: [this.timeline.date_format || 'MMM dd, y', Validators.required],
      description: [this.timeline.description || '', Validators.required],
      event: [this.timeline.event || null, Validators.required],
      title: [this.timeline.title || '']
    });
    this.assetForm = this.fb.group({
      asset_type: this.timeline.asset_type || null
    });
  }

  onRemoveFile(payload) {
    console.log(payload);
    this.store.dispatch(new RemoveTimelineFile(payload));
  }

}
