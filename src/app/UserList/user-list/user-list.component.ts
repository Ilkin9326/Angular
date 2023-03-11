import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { UsersListService } from 'src/app/users-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private service: UsersListService, private route: Router){}
  

  user: User[] = [];

  ngOnInit() { 
    this.service.getUserList().subscribe((data:any)=> this.user = data['data']);
    
    if(this.user == null){
      this.route.navigate(['login']);
    }
  } 

}
