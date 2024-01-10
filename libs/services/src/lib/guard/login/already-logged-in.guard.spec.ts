import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { alreadyLoggedInGuard } from './already-logged-in.guard';

describe('alreadyLoggedInGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => alreadyLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
