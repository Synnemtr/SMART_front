import { TestBed } from '@angular/core/testing';

import { MqService } from './mq.service';

describe('MotivationService', () => {
  let service: MqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
