import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationShowComponent } from './organization-show.component';

describe('OrganizationShowComponent', () => {
  let component: OrganizationShowComponent;
  let fixture: ComponentFixture<OrganizationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
