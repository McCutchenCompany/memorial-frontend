import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocationMarker } from '@shared/models/location-marker.model';
import { configureTestSuite } from 'ng-bullet';

import { FindApiService } from './find-api.service';

describe('FindApiService', () => {
  let service: FindApiService;
  let httpMock: HttpTestingController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        FindApiService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(FindApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get in range', () => {
    const params = {
      top: 12.34,
      right: 56.78,
      bottom: 90.12,
      left: 34.56
    };
    const dummyMarker = [{
      latitude: 32.610715899999995,
      longitude: -97.1454528
    } as LocationMarker];
    service.getInRange(params).subscribe(markers => {
      expect(markers).toEqual(dummyMarker);
    });

    const req = httpMock.expectOne(`${service.API_URL}/locations/in_range?top=12.34&right=56.78&bottom=90.12&left=34.56`);
    req.flush(dummyMarker);
  });
});
