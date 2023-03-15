import { Injectable } from '@angular/core';
import { Observable, Subject, of, map } from 'rxjs';
import { User } from './interfaces/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
   'Accept': 'application/json'
});

const requestOptions = { headers: headers};
@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private http: HttpClient) { }

  public posts = new Subject<User[]>();

  user:User[] = [];

  getUserList():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8000/api/v1/auth/user', requestOptions);
  }
}
