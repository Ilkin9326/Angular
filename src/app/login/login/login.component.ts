import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, switchMap } from 'rxjs';
import { User } from 'src/app/user';
import { UsersListService } from 'src/app/users-list.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(private http: HttpClient, private service: UsersListService, private toastr: ToastrService, private route: Router, private authService: AuthService){}
  userInfoSubscrp = Subscription;
  
  
  loginForm!: FormGroup;
  data:string='';
  
  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.max(2)])
    });
  }

  onSubmit(){
    this.authService.postLogin(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    this.authService.subject.subscribe((res)=>this.data=res);
    console.log(this.data);
      /*this.http.get<any>(url);
      // the response is correct but not set the cookies
      this.http.post<any>('http://127.0.0.1:8000/api/v1/login', data, {withCredentials: true}).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.data);
          this.toastr.success('Ugurlu login', 'Success operations');
          //this.route.navigate(['/user_list']);        
        },

        error: (res) => console.log('bura errr: '+res)
      })*/


       
  }

}
