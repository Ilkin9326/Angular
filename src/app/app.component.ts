import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'src/config/app-config';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'Basic Login Auth';
  isLoggedIn:boolean = false;

  constructor(private service: AuthService, private route: Router, private router: ActivatedRoute){
    this.service.userActivated.subscribe(res=> this.isLoggedIn=res)
  }
  
  ngOnInit(): void {
    //this.service.checkLogin().subscribe((res)=> this.isLoggedIn=true)
  }

  logOutEle(){
    this.service.logOut().subscribe({
      next:(res)=>{
        if(res.status == 'Request was successful' && res.data == 'Log out edildi'){
          this.service.userActivated.next(false);
          this.route.navigate(['login'], {relativeTo:this.router})
        }
      },
      error: (err: HttpErrorResponse) =>{
        console.log('error ')
      }
    });

   
  }

}
