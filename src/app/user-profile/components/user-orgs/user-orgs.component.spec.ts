import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrgsComponent } from './user-orgs.component';

describe('UserOrgsComponent', () => {
  let component: UserOrgsComponent;
  let fixture: ComponentFixture<UserOrgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
