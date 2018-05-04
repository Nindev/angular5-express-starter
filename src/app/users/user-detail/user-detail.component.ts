import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../users.model';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private users: UsersService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      if (data.user) {
        this.user = data.user;
      } else {
        this.user = new User();
      }
    });

    this.auth.me$.subscribe(me => this.isAdmin = me.admin);
  }

  save(form) {
    if (form.valid) {
      if (this.user._id) {
        this.users.save(this.user).subscribe(
          user => this.router.navigate(['/users', user._id]),
          err => this.handleError(err)
        );
      } else {
        this.users.create(this.user).subscribe(
          user => this.router.navigate(['/users']),
          err => this.handleError(err)
        );
      }
    }
  }

  handleError(err) {
    this.snack.open(err.error ? err.error.message : err.message, 'Ok', {
      duration: 3000
    });
  }
}
