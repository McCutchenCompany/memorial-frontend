import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatDividerModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from 'ng-bullet';

import { Memorial } from './../../../shared/models/memorial.model';
import { CreateNavComponent } from './create-nav.component';

describe('CreateNavComponent', () => {
  let component: CreateNavComponent;
  let fixture: ComponentFixture<CreateNavComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNavComponent ],
      imports: [
        RouterTestingModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNavComponent);
    component = fixture.componentInstance;
    component.memorial = {
      first_name: 'first',
      last_name: 'last',
      uuid: '1234',
      published: false,
      birth_date: new Date(),
      death_date: new Date()
    } as Memorial;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
