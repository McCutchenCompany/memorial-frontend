import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAlbumShowComponent } from './photo-album-show.component';

describe('PhotoAlbumShowComponent', () => {
  let component: PhotoAlbumShowComponent;
  let fixture: ComponentFixture<PhotoAlbumShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoAlbumShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoAlbumShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
