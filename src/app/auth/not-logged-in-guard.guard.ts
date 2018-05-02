import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Location } from '@angular/common';
import { JWT_TOKEN_STORAGE, AuthService } from './auth.service';

@Injectable()
export class NotLoggedInGuardGuard implements CanActivate {
  constructor(
    private location: Location,
    private auth: AuthService,
    private localStorage: LocalStorage) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.loggedIn$.pipe(
      map(loggedIn => {
        if (loggedIn) {
          this.location.back();
          return false;
        }
        return true;
      })
    );
  }
}
