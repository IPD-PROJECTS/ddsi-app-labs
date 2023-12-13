import { TestBed } from '@angular/core/testing';

import { ApplicationRoutingService } from './application-routing.service';

describe('ApplicationRoutingService', () => {
  let service: ApplicationRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
