import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private tokenKey = 'token';
  private loginKey = 'login';
  userName = '';
  userProfileImg = '';
  userEmail = '';
  loggedEmail = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.configureUserData();
  }

  private configureUserData() {
    if (this.authService.getToken()) {
      this.userName = JSON.parse(localStorage.getItem(this.tokenKey)!).name;
      this.userProfileImg = JSON.parse(localStorage.getItem(this.tokenKey)!).picture;
      this.userEmail = JSON.parse(localStorage.getItem(this.tokenKey)!).email;
      this.loggedEmail = JSON.parse(localStorage.getItem(this.tokenKey)!);
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate([this.loginKey]);
  }
}
