import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../globals';

@Component({
  selector: 'app-myconts',
  templateUrl: './myconts.component.html',
  styleUrls: ['./myconts.component.scss']
})
export class MycontsComponent implements OnInit {
  private username: string;
  private cnp: string;

  private getContsUrl = this.globals._url + 'user/getConts';
  private getOwnCNPUrl = this.globals._url + 'user/getOwnCNP';
  private getOwnConts = this.globals._url + 'user/getUserOwnConts';

  private requestOptions: object = {
    responseType: 'text'
  };

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private http: HttpClient,
              private globals: Globals) { }

  ngOnInit() {
    this.username = this.tokenStorage.getUsername();
    this.getOwnCNP();
  }

  getOwnCNP() {
    this.http.post<string>(this.getOwnCNPUrl, this.username, this.requestOptions).subscribe(
      result => {
        console.log('Result : ' + result);
        this.cnp = result;
      });
  }

  getUserConts() {

  }
}
