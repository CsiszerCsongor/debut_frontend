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

  private getContsUrl = this.globals._url + 'user/getConts';

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private http: HttpClient,
              private globals: Globals) { }

  ngOnInit() {

  }

}
