import { TestBed, async, inject } from '@angular/core/testing';

import { NotLoggedInGuardGuard } from './not-logged-in-guard.guard';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('NotLoggedInGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [NotLoggedInGuardGuard, { provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  it('should ...', inject([NotLoggedInGuardGuard], (guard: NotLoggedInGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
