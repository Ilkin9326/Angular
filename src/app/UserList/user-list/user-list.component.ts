import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/user';
import { UsersListService } from 'src/app/users-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private service: UsersListService,
     private route: Router,
     private router: ActivatedRoute,
     private toastr: ToastrService){}
  

  user: User[] = [];

  ngOnInit() { 
    this.getUserList();
  }

  getUserList(){
    this.service.getUserList().subscribe({
      next: (res:any)=> this.user = res['data'],
      error: (res:HttpErrorResponse) => {
        console.log(res)
      }
    });
  }

}
