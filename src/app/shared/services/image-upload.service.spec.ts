import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';

import { ImageUploadService } from './image-upload.service';

describe('ImageUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: Store,
        useClass: TestStore
      }
    ]
  }));

  it('should be created', () => {
    const service: ImageUploadService = TestBed.get(ImageUploadService);
    expect(service).toBeTruthy();
  });
});
