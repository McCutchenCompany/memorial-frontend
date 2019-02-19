import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';

import { LocationMarker } from './../../../shared/models/location-marker.model';
import { Memorial } from './../../../shared/models/memorial.model';
import { TestStore } from './../../../shared/testing/test-store';
import { MemorialInfoComponent } from './memorial-info.component';

describe('MemorialInfoComponent', () => {
  let component: MemorialInfoComponent;
  let fixture: ComponentFixture<MemorialInfoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialInfoComponent ],
      providers: [
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialInfoComponent);
    component = fixture.componentInstance;
    component.memorial = {
      birth_date: new Date(),
      death_date: new Date(),
      first_name: 'first',
      description: 'description'
    } as Memorial;
    component.location = {
      description: 'description'
    } as LocationMarker;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
