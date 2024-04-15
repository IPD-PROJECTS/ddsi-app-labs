import { TestBed } from '@angular/core/testing';

import { SampleManagementService } from './sample-management.service';

describe('SampleManagementService', () => {
  let service: SampleManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
