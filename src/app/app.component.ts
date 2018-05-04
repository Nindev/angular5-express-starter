import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { User } from './users/users.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedUser: Observable<User>;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    auth.loggedInChanges$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (!loggedIn) {
        this.loggedUser = null;
      } else {
        this.loggedUser = this.auth.me$;
      }
    });
  }

  ngOnInit() {
    this.auth.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (!loggedIn) {
        this.loggedUser = null;
      } else {
        this.loggedUser = this.auth.me$;
      }
    });
  }

  signout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
