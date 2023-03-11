import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttpErrorHandlerInterceptorServiceInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService,  private route: Router, private router: ActivatedRoute) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError(error =>{
      switch(error.status){
          case HttpStatusCode.Unauthorized:
            this.toastr.warning('Tekrar giris edin', 'Invalid credentials');
            this.route.navigate(['login'], {relativeTo: this.router});
            break;
          case HttpStatusCode.InternalServerError:
            this.toastr.error('everything is broken', 'Internal Server Error');
            break;
          case HttpStatusCode.BadRequest:
            this.toastr.error('Bad request', 'Bad request');
            break;
          default:
            this.toastr.error('Bilinmeyen xeta bas verdi'+error, 'Xeta');
            console.log(error)
            this.route.navigate(['login'], {relativeTo: this.router});
            break;

      }
      return of(error);
    }));
  }
}
