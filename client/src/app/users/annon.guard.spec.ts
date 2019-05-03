import { TestBed, async, inject } from '@angular/core/testing';

import { AnnonGuard } from './annon.guard';

describe('AnnonGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnonGuard]
    });
  });

  it('should ...', inject([AnnonGuard], (guard: AnnonGuard) => {
    expect(guard).toBeTruthy();
  }));
});
