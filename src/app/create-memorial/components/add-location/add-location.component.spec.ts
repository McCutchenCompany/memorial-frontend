import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatIconModule } from '@angular/material';
import { configureTestSuite } from 'ng-bullet';

import { AddLocationComponent } from './add-location.component';

fdescribe('AddLocationComponent', () => {
  let component: AddLocationComponent;
  let fixture: ComponentFixture<AddLocationComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationComponent ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        AgmCoreModule.forRoot({}),
        AgmJsMarkerClustererModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
