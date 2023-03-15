import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, Subject, switchMap } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept':'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route: Router) { }

  token!:string;
  userActivated = new Subject<boolean>();
  isLoggedIn:boolean = false;

  postLogin(email:string, password:string){
    const url = `http://localhost:8000/sanctum/csrf-cookie`;
    let data=
    {
      email: email,
      password: password
    }

    this.http.get(url)
        .pipe(
            switchMap((result:any) => this.http.post('http://localhost:8000/api/login', data, httpOptions))
        ).subscribe({
          next: (res:any)=> {
            
            if(res.status != null && res.status != "" && res.status == "Request was successful"){
              this.isLoggedIn=true;
              this.userActivated.next(true);
              this.route.navigate(['user_list']);
            }
          },
          error: (res)=>console.log('login zamani error bas verdi', res)
    })
  }

  postSignUp(name:string, email:string, password:string): Observable<any>{
    const url = `http://localhost:8000/sanctum/csrf-cookie`;
    
    let data=
    {
      name: name,
      email: email,
      password: password
    }
    //this.http.get(url);
    return this.http.post('http://localhost:8000/api/signup', data, httpOptions);

  }

  logOut():Observable<any>{
    this.isLoggedIn = false;
    return this.http.post('http://localhost:8000/api/logOut', httpOptions);
  }

  isUserAuthenticated():boolean{

    return this.isLoggedIn;
    /*let message:string = "";
    
    this.logOut().pipe(
      map((res) => {
        message=res.data
        this.isLoggedIn=false
      })
    ).subscribe(res=> console.log('ne var:', res))
    return of(message);*/
  }

}
