import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, of, Subject, switchMap } from 'rxjs';
import { AppConfig } from 'src/config/app-config';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept':'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!:string;
  userActivated = new BehaviorSubject(false);
  isLoggedIn:boolean = false; 

  constructor(private http: HttpClient, private route: Router, private toastr: ToastrService, private config: AppConfig) {
      this.checkLogin().subscribe((res)=> {
        this.isLoggedIn=true;
        this.userActivated.next(true);
      })
  }

  postLogin(email:string, password:string){
    const url = `http://localhost:8000/sanctum/csrf-cookie`;
    let data=
    {
      email: email,
      password: password
    }

    this.http.get(url)
        .pipe(
            switchMap((result:any) => this.http.post(this.config.baseUrl+'auth/login', data, httpOptions))
        ).subscribe({
          next: (res:any)=> {
            
            if(res.status != null && res.status != "" && res.status == "Request was successful"){
              this.isLoggedIn=true;
              this.userActivated.next(true);
              this.route.navigate(['user_list']);
            }
          },
          error: (res:HttpErrorResponse)=> { this.loginErroHandle(res) }
    })
  }

  //user signup
  postSignUp(name:string, email:string, password:string): Observable<any>{
    const url = `http://localhost:8000/sanctum/csrf-cookie`;
    
    let data=
    {
      name: name,
      email: email,
      password: password
    }

    return this.http.get(url)
    .pipe(
        switchMap((result:any) => this.http.post(this.config.baseUrl+'auth/signup', data, httpOptions))
    );
  }

  //user logout
  logOut():Observable<any>{
    this.isLoggedIn = false;
    return this.http.post(this.config.baseUrl+'auth/logOut', httpOptions);
  }

  isUserAuthenticated():boolean{
    return this.isLoggedIn;
  }

  checkLogin(): Observable<any>{
    return this.http.get(this.config.baseUrl+'auth/checkLogin');
  }

  loginErroHandle(error:HttpErrorResponse){
    this.toastr.error(error.error.message, 'Unexpected error')
  }


}
