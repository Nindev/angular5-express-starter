import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from './users.model';
import { UsersService } from './users.service';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UserDetailResolver implements Resolve<User> {
  constructor(
    private users: UsersService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    const id = route.paramMap.get('id');
    return this.users.findOne(id).pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/users']);
          return null;
        }
      }),
      catchError(err => {
        this.router.navigate(['/users']);
        this.snack.open(err.error ? err.error.message : err.message, 'Ok', {
          duration: 3000
        });
        return of(null);
      })
    );
  }

}
