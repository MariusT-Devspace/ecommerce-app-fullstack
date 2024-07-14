import { TestBed } from '@angular/core/testing';

import { TitleManagerService } from './title-manager.service';

describe('TitleManagerService', () => {
  let service: TitleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
