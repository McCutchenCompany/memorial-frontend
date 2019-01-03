import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Timeline } from '@shared/models/timeline.model';
import { RemoveTimelineEntry, RemoveTimelineFile, SetEditingTimeline } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';

import { UpdateTimeline } from './../../../store/create-memorial/create-memorial.actions';

@Component({
  selector: 'app-timeline-form',
  templateUrl: './timeline-form.component.html',
  styleUrls: ['./timeline-form.component.scss']
})
export class TimelineFormComponent implements OnInit {

  @Input() timeline: Timeline;
  @Input() editingIds: string[];

  timelineForm: FormGroup;
  assetForm: FormGroup;

  expanded = true;

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
    this.checkExpanded();
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

  checkExpanded() {
    if (!this.editingIds.includes(this.timeline.uuid) && this.timeline.date) {
      this.expanded = false;
    }
  }

  toggleForm() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.editingIds.push(this.timeline.uuid);
      this.store.dispatch(new SetEditingTimeline(this.editingIds));
    } else {
      const index = this.editingIds.indexOf(this.timeline.uuid);
      this.editingIds.splice(index, 1);
      this.store.dispatch(new SetEditingTimeline(this.editingIds));
    }
  }

  onRemoveFile(payload) {
    this.store.dispatch(new RemoveTimelineFile(payload));
  }

  onRemoveTimelineEntry() {
    this.store.dispatch(new RemoveTimelineEntry(this.timeline.uuid));
  }

  onSaveChanges() {
    const payload = {
      memorial_id: this.timeline.memorial_id,
      timelines: [
        {
          uuid: this.timeline.uuid,
          ...this.timelineForm.value
        }
      ]
    };
    this.store.dispatch(new UpdateTimeline(payload));
  }

}