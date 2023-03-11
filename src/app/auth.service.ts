import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, switchMap } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept':'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route: Router) { }

  token!:string;
  subject = new Subject<string>();
  isLoggedIn:boolean = false;

  postLogin(email:string, password:string): Observable<string>{
    const url = `http://localhost:8000/sanctum/csrf-cookie`;
    let data=
    {
      email: email,
      password: password
    }

    this.http.get(url)
        .pipe(
            switchMap((result:any) => this.http.post('http://localhost:8000/api/v1/login', data, httpOptions))
        ).subscribe({
          next: (res:any)=> {
            
            if(res.status != null && res.status != "" && res.status == "Request was successful"){
              this.isLoggedIn=true;
              this.route.navigate(['user_list']);
            }
          },
          error: (res)=>console.log('login zamani error bas verdi', res)
    })
    return this.subject.asObservable();
  }

  logOut(){
    this.isLoggedIn = false;
  }

  isUserAuthenticated():boolean{
    return this.isLoggedIn;
  }

}
