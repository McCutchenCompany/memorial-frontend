import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { AddLocationComponent } from './add-location.component';

describe('AddLocationComponent', () => {
  let component: AddLocationComponent;
  let fixture: ComponentFixture<AddLocationComponent>;
  let store: TestStore<any>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationComponent ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule,
        RouterTestingModule,
        AgmCoreModule.forRoot({}),
        AgmJsMarkerClustererModule,
        ReactiveFormsModule
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
    store = TestBed.get(Store);
    store.setState({
      latitude: 12,
      longitude: 10,
      zoom: 1,
      memorial: {
        uuid: '1234'
      }
    });
    fixture = TestBed.createComponent(AddLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
