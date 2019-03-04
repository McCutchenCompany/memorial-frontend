import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePhotosComponent } from './approve-photos.component';

describe('ApprovePhotosComponent', () => {
  let component: ApprovePhotosComponent;
  let fixture: ComponentFixture<ApprovePhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
