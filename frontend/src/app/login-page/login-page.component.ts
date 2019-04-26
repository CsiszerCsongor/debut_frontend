import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { RouterModule, Routes, Router } from '@angular/router';
import {AuthLoginInfo} from '../auth/login-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  userCode = '';
  password = '';
  response = '';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router
    ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  login() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.userCode,
      this.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigateByUrl('/main');
      },
      error => {
        console.log(error);
        this.errorMessage = error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  registrationBtn() {
    this.router.navigateByUrl('/registration').then(e => {
      if (e) {
        console.log('Navigation successful!');
      } else {
        console.log('Navigation unsuccessful!');
      }
    });
  }

  forgottenPassword() {}

}
