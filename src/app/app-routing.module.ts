import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserListComponent } from './UserList/user-list/user-list.component';

const routes: Routes = [ 
{path: '', component: HomeComponent, canActivate: [AuthGuard]},
{path: 'login', component: LoginComponent},
{path: 'user_list', component: UserListComponent},
{path: 'user_signup', component: UserSignupComponent},
{ path: '**', redirectTo: "/" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
