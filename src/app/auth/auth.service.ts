import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, mapTo, mergeMap } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../users/users.model';

export const JWT_TOKEN_STORAGE = 'appJwtToken';
export const JWT_TOKEN_EXPIRES_AT = 'appJwtTokenExpiresAt';

@Injectable()
export class AuthService {
  private _loggedInChanges = new BehaviorSubject<boolean>(false);

  private setToken$ = switchMap((token: any) => {
    if (token) {
      return merge(
        this.localStorage.setItem(JWT_TOKEN_STORAGE, token.jwtToken),
        this.localStorage.setItem(JWT_TOKEN_EXPIRES_AT, token.expiresAt)
      ).pipe(mapTo(true));
    } else {
      return of(false);
    }
  });

  get loggedInChanges$(): Observable<boolean> { return this._loggedInChanges.asObservable(); }
  get loggedIn$(): Observable<boolean> {
    return this.token$.pipe(
      map(token => {
        if (token) {
          const expiresAt = new Date(token.expiresAt);
          const now = new Date();
          return token.token && expiresAt > now;
        }
        return false;
      })
    );
  }

  get me$(): Observable<User> {
    return this.getHeaders().pipe(
      switchMap((headers: HttpHeaders) => {
        return this.http.get<User>('/api/users/me', {
          headers: headers
        });
      })
    );
  }

  get token$(): Observable<any> {
    return this.localStorage.getItem(JWT_TOKEN_STORAGE).pipe(
      mergeMap(
        expiresAt => this.localStorage.getItem(JWT_TOKEN_EXPIRES_AT),
        (token, expiresAt) => ({ token, expiresAt })
      )
    );
  }

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post('/auth/signin', { email, password }).pipe(
      this.setToken$,
      switchMap(success => {
        if (success) {
          this._loggedInChanges.next(true);
          return this.me$;
        }
      })
    );
  }

  logout(): Observable<boolean> {
    return this.localStorage.removeItem(JWT_TOKEN_STORAGE).pipe(
      map((res: boolean) => {
        this._loggedInChanges.next(false);
        return res;
      })
    );
  }

  getHeaders(): Observable<HttpHeaders> {
    return this.localStorage.getItem(JWT_TOKEN_STORAGE).pipe(
      map(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });

        return headers;
      })
    );
  }
}
