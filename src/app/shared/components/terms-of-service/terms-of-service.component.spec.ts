import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { configureTestSuite } from 'ng-bullet';

import { TermsOfServiceComponent } from './terms-of-service.component';

describe('TermsOfServiceComponent', () => {
  let component: TermsOfServiceComponent;
  let fixture: ComponentFixture<TermsOfServiceComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfServiceComponent ],
      imports: [
        MatCardModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
