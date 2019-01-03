import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  @Input() user: User;
  @Output() saveUser: EventEmitter<any> = new EventEmitter<any>();
  userForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.user.first_name) {
      if (localStorage.getItem('reroute')) {
        this.router.navigateByUrl(localStorage.getItem('reroute'));
      }
      this.router.navigate(['/profile']);
    }
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      uuid: this.user.uuid,
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      email: [this.user.email, Validators.required]
    });
  }

  onSave() {
    this.saveUser.emit(this.userForm.value);
  }
}
