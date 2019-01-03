import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialMemoriesComponent } from './memorial-memories.component';

describe('MemorialMemoriesComponent', () => {
  let component: MemorialMemoriesComponent;
  let fixture: ComponentFixture<MemorialMemoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialMemoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialMemoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
