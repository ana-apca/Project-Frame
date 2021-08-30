import { TestBed } from '@angular/core/testing';

import { vitrineservice } from "./vitrine.service";

describe('VitrineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: vitrineservice = TestBed.get(vitrineservice);
    expect(service).toBeTruthy();
  });
});
