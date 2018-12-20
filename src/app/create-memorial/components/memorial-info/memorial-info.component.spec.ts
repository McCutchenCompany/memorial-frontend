import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Memorial } from '@shared/models/memorial.model';

import { MemorialInfoComponent } from './memorial-info.component';

describe('MemorialInfoComponent', () => {
  let component: MemorialInfoComponent;
  let fixture: ComponentFixture<MemorialInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialInfoComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialInfoComponent);
    component = fixture.componentInstance;
    component.memorialInfo = {
      first_name: 'Mitch',
      middle_name: 'Jacob',
      last_name: 'McCutchen',
      birth_date: new Date(),
      death_date: new Date(),
      description: ''
    } as Memorial;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
