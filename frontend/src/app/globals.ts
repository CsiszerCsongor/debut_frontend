import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class Globals {
    _url: string = "http://localhost:8080/api/";
     httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
}
