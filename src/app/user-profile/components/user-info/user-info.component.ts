import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() user;
  @Output() saveUser: EventEmitter<any> = new EventEmitter<any>();

  userForm: FormGroup;
  editing = false;

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      uuid: this.user.uuid,
      first_name: [{value: this.user.first_name, disabled: true}],
      last_name: [{value: this.user.last_name, disabled: true}],
      email: [{value: this.user.email, disabled: true}]
    });
  }

  onEdit() {
    this.editing = !this.editing;
    this.userForm.enable();
  }

  onCancel() {
    this.editing = !this.editing;
    this.userForm.disable();
    this.buildForm();
  }

  onSave() {
    this.saveUser.emit(this.userForm.value);
    this.editing = !this.editing;
    this.userForm.disable();
  }

}
