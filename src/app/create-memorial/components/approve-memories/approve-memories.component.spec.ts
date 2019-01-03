import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMemoriesComponent } from './approve-memories.component';

describe('ApproveMemoriesComponent', () => {
  let component: ApproveMemoriesComponent;
  let fixture: ComponentFixture<ApproveMemoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveMemoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMemoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
