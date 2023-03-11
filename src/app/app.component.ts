import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Basic Login Auth';
  
  constructor(private service: AuthService, private route: Router){}
  
  isLoggedIn:boolean = this.service.isUserAuthenticated();

  logOlubmu:boolean = this.service.isUserAuthenticated();

 


  logOutEle(){
    console.log(this.service.isUserAuthenticated());
    //this.service.logOut();
  }

}
