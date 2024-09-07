import { TestBed } from '@angular/core/testing';

import { AlertSrvService } from './alert-srv.service';

describe('AlertSrvService', () => {
  let service: AlertSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
