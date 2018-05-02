import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { JWT_TOKEN_STORAGE, JWT_TOKEN_EXPIRES_AT, AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalStorage,
    private auth: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.loggedIn$.pipe(
      map(loggedIn => {
        if (!loggedIn) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
