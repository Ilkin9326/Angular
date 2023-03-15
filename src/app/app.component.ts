import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private service: AuthService, private route: Router){}

  title = 'Basic Login Auth';
  isLoggedIn:boolean = false;
  
  ngOnInit(): void {
    this.service.userActivated.subscribe(res=> this.isLoggedIn = res)
  }

  logOutEle(){
    this.service.logOut().subscribe({
      next:(res)=>{
        if(res.status == 'Request was successful' && res.data == 'Log out edildi'){
          this.route.navigate(['login'])
        }
      },
      error: (err: HttpErrorResponse) =>{
        console.log('error ')
      }
    });
  }

}
