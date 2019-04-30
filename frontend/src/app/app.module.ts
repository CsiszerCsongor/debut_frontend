import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

import { AlertModule } from 'ngx-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginService } from './login.service';

import { Globals } from './globals';
import { RegistrationComponent } from './registration/registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import { MycontsComponent } from './pages/myconts/myconts.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { PasswordComponent } from './pages/password/password.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { ManagementComponent } from './pages/management/management.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    RegistrationComponent,
    HomeComponent,
    NavbarComponent,
    MycontsComponent,
    TransferComponent,
    ExchangeComponent,
    PasswordComponent,
    CreateUserComponent,
    UpdateUserComponent,
    CurrencyComponent,
    ManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  entryComponents: [
    MycontsComponent,
    TransferComponent,
    ExchangeComponent,
    PasswordComponent,
    CreateUserComponent,
    UpdateUserComponent,
    CurrencyComponent,
    ManagementComponent
  ],
  providers: [LoginService, Globals, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
