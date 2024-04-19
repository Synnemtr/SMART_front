import { TestBed } from '@angular/core/testing';

import { AlreadyAuthenticatedGuardGuard } from './already-authenticated-guard.guard';

describe('AlreadyAuthenticatedGuardGuard', () => {
  let guard: AlreadyAuthenticatedGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlreadyAuthenticatedGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
