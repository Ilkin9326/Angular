import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './UserList/user-list/user-list.component';
import { HttpErrorHandlerInterceptorServiceInterceptor } from './http-error-handler-interceptor-service.interceptor';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { HttpXsrfInterceptor } from './http-xsrf.interceptor';
import { HttpRequestInterceptor } from './http-request.interceptor';
import { AuthGuard } from './auth.guard';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { HomeComponent } from './home/home.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    NotFoundComponentComponent,
    HomeComponent,
    UserSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
      AuthGuard,
      /*{provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorServiceInterceptor, multi:true},*/
      {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi:true},
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
