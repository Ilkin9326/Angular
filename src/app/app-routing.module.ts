import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login/login.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { UserListComponent } from './UserList/user-list/user-list.component';

const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'user_list', component: UserListComponent, canActivate: [AuthGuard]},
{ path: '**', redirectTo: "/" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
