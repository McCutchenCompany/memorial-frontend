import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { ViewMemorialComponent } from './view-memorial.component';

describe('ViewMemorialComponent', () => {
  let component: ViewMemorialComponent;
  let fixture: ComponentFixture<ViewMemorialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemorialComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
