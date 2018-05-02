import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AuthService, { provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
