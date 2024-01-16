import { TestBed } from '@angular/core/testing';

import { AppRunningConfigService } from './app-running-config.service';

describe('AppRunningConfigService', () => {
  let service: AppRunningConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRunningConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
