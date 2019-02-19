import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { MyMemorialsComponent } from 'app/user-profile/components/my-memorials/my-memorials.component';

import { MyMemorialCardComponent } from './../../components/my-memorial-card/my-memorial-card.component';
import { UserInfoComponent } from './../../components/user-info/user-info.component';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserProfileComponent,
        UserInfoComponent,
        MyMemorialsComponent,
        MyMemorialCardComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
