import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialAlbumComponent } from './memorial-album.component';

describe('MemorialAlbumComponent', () => {
  let component: MemorialAlbumComponent;
  let fixture: ComponentFixture<MemorialAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
