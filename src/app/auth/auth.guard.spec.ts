import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
