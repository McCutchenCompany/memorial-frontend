import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Memory } from '@shared/models/memory.model';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-memorial-memories',
  templateUrl: './memorial-memories.component.html',
  styleUrls: ['./memorial-memories.component.scss']
})
export class MemorialMemoriesComponent implements OnInit {

  @Input() memories: Memory[];
  @Input() public: boolean;
  @Input() user: User;

  @Output() addEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() login: EventEmitter<any> = new EventEmitter<any>();

  memoryForm: FormGroup;
  adding = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.memoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  toggleForm() {
    this.adding = !this.adding;
  }

  onSubmit() {
    this.addEvent.emit(this.memoryForm.value);
  }

  onLogin() {
    this.login.emit();
  }

}
