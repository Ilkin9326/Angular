import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuth: AuthService, private route: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('he guard');  

    this.userAuth.userActivated.pipe(
      map((isLoggedIn) =>{
        console.log('isLoggedIn nedi: ', isLoggedIn)
        return isLoggedIn;
      })
    ).subscribe({
      next: (res:boolean)=>{
        if(!res){
          this.route.navigate(['/login'])
          return false;
        }
        return true;
      }
    })
    /*if(!this.userAuth.isUserAuthenticated()){
      console.log('guardmi')
      this.route.navigate(['/login'])
      return false;
    }*/
    return true;
  }
  
}
