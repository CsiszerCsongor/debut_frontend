import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Globals } from './globals'
import { Router, ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = this.globals._url + "login";

  constructor(private http:HttpClient, 
              private globals:Globals,
              private router:Router, 
              private route:ActivatedRoute  
    ) { }

  login(userCode, password){
    console.log("url: " + this.loginUrl);
    console.log("userCode: " + userCode);
    console.log("password: " + password);

    return this.http.post(this.loginUrl, {
            "userCode":userCode,
            "password":password
      }).subscribe(isValid => {
            if (isValid){
              sessionStorage.setItem('token',btoa(userCode + ":" + password));
              this.router.navigateByUrl('/main').then(e => {
                if(e){
                  console.log("Navigation successful!")
                }
                else{
                  console.log("Navigation unsuccessful!")
                }
              });
            }
            else{
              alert("Authentication failed!");
            }
      });
  }
}
