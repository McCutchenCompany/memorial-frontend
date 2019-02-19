import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Timeline } from '@shared/models/timeline.model';
import { getCreatedSaving } from '@store/create-memorial';
import { RemoveTimelineEntry, RemoveTimelineFile, SetEditingTimeline } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

import { UpdateTimeline } from './../../../store/create-memorial/create-memorial.actions';

@Component({
  selector: 'app-timeline-form',
  templateUrl: './timeline-form.component.html',
  styleUrls: ['./timeline-form.component.scss']
})
export class TimelineFormComponent implements OnInit {

  @Input() timeline: Timeline;
  @Input() editingIds: string[];

  saving$: Observable<boolean>;

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
    {value: 'video', display: 'Video'}
  ];

  get imageFormat() {
    return {
      posX: this.timeline.posX,
      posY: this.timeline.posY,
      scale: this.timeline.scale,
      rot: this.timeline.rot
    };
  }

  get videoSrc() {
    if (this.timeline.asset_link && this.timeline.asset_link.length === 11) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.timeline.asset_link}`);
    }
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<CreateMemorialState>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.saving$ = this.store.pipe(select(getCreatedSaving));
  }

  ngOnInit() {
    this.buildForm();
    this.checkExpanded();
  }

  buildForm() {
    this.timelineForm = this.fb.group({
      date: [this.timeline.date || '', Validators.required],
      date_format: [this.timeline.date_format || 'MMM dd, y', Validators.required],
      description: [this.timeline.description || '', Validators.required]
    });
    this.assetForm = this.fb.group({
      asset_type: this.timeline.asset_type || null,
      asset_link: this.timeline.asset_type === 'video' ?
        `https://www.youtube.com/watch?v=${this.timeline.asset_link}` : null
        || null
    });
  }

  checkExpanded() {
    if (!this.editingIds.includes(this.timeline.uuid)) {
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'delete this timeline event? This is a permanent action.'
      },
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new RemoveTimelineEntry(this.timeline.uuid));
      }
    });
  }

  onSelection(event) {
    if (event.value === null) {
      this.onSaveChanges();
    }
  }

  onSaveChanges() {
    const payload = {
      memorial_id: this.timeline.memorial_id,
      timelines: [
        {
          uuid: this.timeline.uuid,
          asset_type: this.assetForm.value.asset_type,
          ...this.timelineForm.value,
        }
      ]
    };
    this.store.dispatch(new UpdateTimeline(payload));
  }

  onLink() {
    if (this.assetForm.value.asset_type === 'video') {
      const params = new URLSearchParams(this.assetForm.value.asset_link.split('?').pop());
      const videoId = params.get('v');
      if (videoId.length === 11) {
        const payload = {
          memorial_id: this.timeline.memorial_id,
          timelines: [
            {
              uuid: this.timeline.uuid,
              asset_type: this.assetForm.value.asset_type,
              asset_link: videoId,
              ...this.timelineForm.value
            }
          ]
        };
        this.store.dispatch(new UpdateTimeline(payload));
      }
    }
  }

}
