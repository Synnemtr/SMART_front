import { TestBed } from '@angular/core/testing';

import { GqService } from './gq.service';

describe('GamificationService', () => {
  let service: GqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
