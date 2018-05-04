import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  find(query?: any, options?: any): Observable<User[]> {
    return this.auth.getHeaders().pipe(
      switchMap(headers => this.http.get<User[]>('/api/users', {
        headers: headers
      }))
    );
  }

  findOne(id: string): Observable<User> {
    return this.auth.getHeaders().pipe(
      switchMap(headers => this.http.get<User>(`/api/users/${id}`, {
        headers: headers
      }))
    );
  }

  create(user: User): Observable<User> {
    return this.auth.getHeaders().pipe(
      switchMap(headers => this.http.post<User>('/api/users', user, {
        headers: headers
      }))
    );
  }

  save(user: User): Observable<User> {
    return this.auth.getHeaders().pipe(
      switchMap(headers => this.http.post<User>(`/api/users/${user._id}`, user, {
        headers: headers
      }))
    );
  }

  remove(user: User): Observable<boolean> {
    return this.auth.getHeaders().pipe(
      switchMap(headers => this.http.delete<boolean>(`/api/users/${user._id}`, {
        headers: headers
      }))
    );
  }
}
