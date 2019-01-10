import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule
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
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
