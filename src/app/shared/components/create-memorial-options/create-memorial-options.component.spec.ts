import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemorialOptionsComponent } from './create-memorial-options.component';

describe('CreateMemorialOptionsComponent', () => {
  let component: CreateMemorialOptionsComponent;
  let fixture: ComponentFixture<CreateMemorialOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMemorialOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemorialOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
