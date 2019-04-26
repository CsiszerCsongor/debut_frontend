import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';
import {ContModel} from '../shared/Cont.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Globals} from '../globals';
import {MycontsComponent} from '../pages/myconts/myconts.component';
import {TransferComponent} from '../pages/transfer/transfer.component';
import {ExchangeComponent} from '../pages/exchange/exchange.component';
import {PasswordComponent} from '../pages/password/password.component';
import {CreateUserComponent} from '../pages/create-user/create-user.component';
import {UpdateUserComponent} from '../pages/update-user/update-user.component';
import {CurrencyComponent} from '../pages/currency/currency.component';
import {ManagementComponent} from '../pages/management/management.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private canAppear = true;
  roles: string[];
  authority: string;
  conts: ContModel[];

  actualPage: string;
  actualComponent: any;

  getDatasUrl = this.globals._url + 'user/getMainPageData';

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private http: HttpClient,
              private globals: Globals) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }

    if (this.authority === 'user') {
      this.actualComponent = MycontsComponent;
    } else {
      this.actualComponent = CreateUserComponent;
    }

    this.http.post<boolean>(this.getDatasUrl, this.tokenStorage.getUsername()).subscribe(
      result => {
        console.log(result);
      });
  }

  receivePage($event) {
    this.actualPage = $event;
    console.log($event);
    if(this.authority === 'user') {
      if (this.actualPage === 'myConts') {
        this.actualComponent = MycontsComponent;
      }
      else if (this.actualPage === 'transfer') {
        this.actualComponent = TransferComponent;
      }
      else if (this.actualPage === 'exchange') {
        this.actualComponent = ExchangeComponent;
      }
      else if (this.actualPage === 'password') {
        this.actualComponent = PasswordComponent;
      }
    }
    else if (this.authority === 'admin') {
      if (this.actualPage === 'createUser') {
        this.actualComponent = CreateUserComponent;
      }
      else if (this.actualPage === 'updateUser') {
        this.actualComponent = UpdateUserComponent;
      }
      else if (this.actualPage === 'currency') {
        this.actualComponent = CurrencyComponent;
      }
      else if (this.actualPage === 'management') {
        this.actualComponent = ManagementComponent;
      }
    }

  }
}
