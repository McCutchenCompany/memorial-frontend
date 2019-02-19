import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { Memorial } from './../../../shared/models/memorial.model';
import { MyMemorialCardComponent } from './my-memorial-card.component';

describe('MyMemorialCardComponent', () => {
  let component: MyMemorialCardComponent;
  let fixture: ComponentFixture<MyMemorialCardComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMemorialCardComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatProgressSpinnerModule
      ],
      providers: [
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMemorialCardComponent);
    component = fixture.componentInstance;
    component.memorial = {
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
