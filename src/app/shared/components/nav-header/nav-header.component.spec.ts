import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { Auth0Login } from '@store/auth/auth.actions';
import { configureTestSuite } from 'ng-bullet';

import { NavHeaderComponent } from './nav-header.component';

describe('NavHeaderComponent', () => {
  let component: NavHeaderComponent;
  let fixture: ComponentFixture<NavHeaderComponent>;
  let store: TestStore<any>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavHeaderComponent
      ],
      imports: [
        RouterTestingModule
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
    fixture = TestBed.createComponent(NavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should login', () => {
    spyOn(store, 'dispatch');
    component.onLogin();
    expect(store.dispatch).toHaveBeenCalledWith(new Auth0Login());
  });
});
