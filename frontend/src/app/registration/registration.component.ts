import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CountryModel} from '../shared/Country.model';
import {UserModel} from '../shared/User.model';
import { Globals } from '../globals';
import {CityModel} from '../shared/City.model';
import {RoleModel} from '../shared/Role.model';
import {SignUpInfo} from '../auth/signup-info';
import {AuthService} from '../auth/auth.service';
import {CurrencyModel} from '../shared/Currency.model';

export interface NameValueInterface {
  id: number;
  name: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public user: UserModel = new UserModel();
  country: CountryModel;
  selectedCurrency: number;
  city: number;
  repeatPassword: string;
  selectedRole: string;

  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  emailIsUsed = false;
  invalidEmail = false;
  telephoneIsUsed = false;
  cnpIsUsed = false;
  passwordsIsNotSimilar = false;

  getCountriesUrl = this.globals._url + 'country/getAll';
  getCitiesUrl = this.globals._url + 'city/getAllFromCountry/';
  getRolesUrl = this.globals._url + 'role/getAll';
  checkTelephoneUrl = this.globals._url + 'user/checkTelephone';
  checkEmailUrl = this.globals._url + 'user/checkEmail';
  checkCNPUrl = this.globals._url + 'user/checkCNP';
  getCurrenciesUrl = this.globals._url + 'currency/getAll';

  countries: CountryModel[];
  cities: NameValueInterface[];
  roles: NameValueInterface[];
  currencies: CurrencyModel[];

  info: SignUpInfo = new SignUpInfo ('', '', 0, '', '', '', '', '', 0, 0, 0, '', 0,['']);

  constructor(private router: Router,
              private http: HttpClient,
              private globals: Globals,
              private authService: AuthService) { }

  ngOnInit() {
    this.http.get<CountryModel[]>(this.getCountriesUrl).subscribe(
      result => {
          console.log(result);
          this.countries = result;
      });
    this.http.get<RoleModel[]>(this.getRolesUrl).subscribe(
      result => {
        console.log(result);
        this.roles = result;
      });
    this.getCurrencies();
  }

  login() {
    this.router.navigateByUrl('/login').then(e => {
      if (e) {
        console.log('Navigation successful!');
      } else {
        console.log('Navigation unsuccessful!');
      }
    });
  }

  registrationBtn() {
    if (!this.emailIsUsed && !this.invalidEmail && !this.telephoneIsUsed && !this.cnpIsUsed && !this.passwordsIsNotSimilar) {
      console.log('I');
      console.log(this.user);

      if (this.user.firstName !== '' && this.user.firstName !== undefined && this.user.lastName !== '' && this.user.lastName !== undefined &&
          this.country !== undefined  && this.city !== undefined && this.user.street !== undefined &&
          this.user.street !== '' && this.user.telephone !== '' && this.user.email !== '' && this.user.cnp !== '' && this.user.cnpNr > 0 &&
          this.user.cnpNr < 1000000 /*&& Number.isInteger(this.user.cnpNr) */&& this.user.password !== '' && this.selectedRole !== undefined &&
          this.user.houseNumber !== undefined) {
        console.log('II');
        this.info = new SignUpInfo (this.user.firstName, this.user.lastName, this.city, this.user.street, this.user.telephone,
                                           this.user.email, this.user.cnp, this.user.serie, this.user.cnpNr, this.user.houseNumber,
                                           this.user.apartman, this.user.password, this.selectedCurrency,[this.selectedRole]);

        console.log('info : ' + this.info);
        this.authService.signUp(this.info).subscribe(result => console.log(result));
      }
    } else {
      // kiirni, hogy helytelen adatok
    }

  }

  getCities() {
    console.log(this.country);
    this.http.get<CityModel[]>(this.getCitiesUrl + this.country).subscribe(
      result => {
        console.log(result);
        this.cities = result;
      });
  }

  getCurrencies() {
    this.http.get<CurrencyModel[]>(this.getCurrenciesUrl).subscribe(
      result => {
        this.currencies = result;
      });
  }

  checkTelephone() {
    if (this.user.telephone != null && this.user.telephone !== '') {
      this.http.post<boolean>(this.checkTelephoneUrl, this.user.telephone).subscribe(
        result => {
          console.log(result);
          this.telephoneIsUsed = result;
        });
    }
  }

  checkEmail() {
    if (this.user.email != null && this.user.email !== '') {
      this.http.post<boolean>(this.checkEmailUrl, this.user.email).subscribe(
        result => {
          console.log(result);
          this.emailIsUsed = result;
        });
    }
    if (this.regexp.test(this.user.email)) {
      this.invalidEmail = false;
    } else {
      this.invalidEmail = true;
    }
  }

  checkCNP() {
    if (this.user.cnp != null && this.user.cnp !== '') {
      this.http.post<boolean>(this.checkCNPUrl, this.user.cnp).subscribe(
        result => {
          console.log(result);
          this.cnpIsUsed = result;
        });
    }
  }

  checkPasswords() {
    if (this.user.password !== this.repeatPassword) {
      this.passwordsIsNotSimilar = true;
    }
    else {
      this.passwordsIsNotSimilar = false;
    }
  }
}
