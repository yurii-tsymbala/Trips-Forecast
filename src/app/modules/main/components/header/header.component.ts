import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private tokenKey = "token"
  name = JSON.parse(localStorage.getItem(this.tokenKey)!).name;
  userProfileImg = JSON.parse(localStorage.getItem(this.tokenKey)!).picture;
  email = JSON.parse(localStorage.getItem(this.tokenKey)!).email;
  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  private getUserEmail(): void {
    // if (this.authService.getEmail()) {
    //   this.userEmail = "Welcome, " + this.authService.getEmail() as string;
    // }
  }

  logOut() {
    this.authService.logOut();
     this.router.navigate(["login"]);
  }

}
