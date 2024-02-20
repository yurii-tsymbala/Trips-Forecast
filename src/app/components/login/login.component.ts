declare var google: any;

import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    this.configureForm();
    this.configureGoogleLogin();
    this.renderGoogleBtn();
  }

  onSubmit(): void {
    const emailInput = this.loginForm.value.emailInput;
    console.log(this.loginForm);
    
    if (this.loginForm.valid) {
      this.authService.logIn(emailInput);
      this.checkLogin();
    }
  }

  private onGoogleLogin(resp: any) {
    if (resp) {
      const token = JSON.parse(atob(resp.credential.split('.')[1]));
      console.log(token);
      this.authService.setToken(token);
      this.checkLogin();
    }
  }

  private configureForm(): void {
    this.loginForm = new FormGroup({
      emailInput: this.emailFormControl,
      passInput: this.passwordFormControl,
    });
  }

  private configureGoogleLogin() {
    google.accounts.id.initialize({
      client_id:
        '370463056112-ps9obkej0cggpol3fckm8hrr4cpt4fbm.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.onGoogleLogin(resp);
      },
    });
  }

  private renderGoogleBtn() {
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 250,
    });
  }

  private checkLogin() {
    if (this.authService.isLoggedIn()) {
      this.ngZone.run(() => {
        this.router.navigate(['main']);
      });
    }
  }
}
