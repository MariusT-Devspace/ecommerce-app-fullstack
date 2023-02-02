import { TestBed } from '@angular/core/testing';

import { AuthUtilsService } from './auth-utils.service';

describe('AuthUtilsService', () => {
  let service: AuthUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
