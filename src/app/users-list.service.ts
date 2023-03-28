import { Injectable } from '@angular/core';
import { Observable, Subject, of, map } from 'rxjs';
import { User } from './interfaces/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AppConfig } from 'src/config/app-config';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
   'Accept': 'application/json'
});

const requestOptions = { headers: headers};
@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private http: HttpClient, private autservise: AuthService, private config: AppConfig) { 
    this.autservise.checkLogin().subscribe({
      next: (res)=>{
        this.autservise.isLoggedIn=true;
        this.autservise.userActivated.next(true);
      },
      error: (err) => {
        this.autservise.isLoggedIn=false;
        this.autservise.userActivated.next(false);
      }
    })    
  }

  public posts = new Subject<User[]>();

  user:User[] = [];

  getUserList():Observable<User[]>{
    return this.http.get<User[]>(this.config.baseUrl+'auth/user', requestOptions);
  }
}
