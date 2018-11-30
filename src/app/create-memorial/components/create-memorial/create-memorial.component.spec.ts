import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { CreateMemorialComponent } from './create-memorial.component';

describe('CreateMemorialComponent', () => {
  let component: CreateMemorialComponent;
  let fixture: ComponentFixture<CreateMemorialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMemorialComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
