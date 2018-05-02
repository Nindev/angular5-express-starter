import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  message: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.auth.logout().subscribe();
  }

  login(form) {
    this.message = '';
    if (form.valid) {
      this.auth.login(this.email, this.password).subscribe(success => {
        if (success) {
          console.log(success);
          this.router.navigate(['/']);
        }
      }, err => {
        this.message = err.error ? err.error.message : err.message;
      });
    }
  }

  logout() {
    this.auth.logout().subscribe(success => this.router.navigate(['/login']));
  }
}
