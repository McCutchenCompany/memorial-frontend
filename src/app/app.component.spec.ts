import { async, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatMenuModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { NavHeaderComponent } from '@shared/components/nav-header/nav-header.component';
import { SharedModule } from '@shared/shared.module';
import { TestStore } from '@shared/testing/test-store';
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
        RouterTestingModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        SharedModule
      ],
      providers: [
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    });
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
