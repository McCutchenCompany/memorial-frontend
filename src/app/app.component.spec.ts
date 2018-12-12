import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavHeaderComponent } from '@shared/components/nav-header/nav-header.component';
import { configureTestSuite } from 'ng-bullet';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavHeaderComponent
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
