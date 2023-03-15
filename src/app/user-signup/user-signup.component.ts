import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit{

  constructor(private service: AuthService, private route: Router, private toastr: ToastrService){}

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.min(3)]),
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl(null, [Validators.required, Validators.max(2)])
    });
  }

  onSubmit(){
    this.service.postSignUp(this.signupForm.get('name')?.value, this.signupForm.get('email')?.value, this.signupForm.get('password')?.value).subscribe({
      next: (res)=>{
        if(res.message == "Ugurlar qeyd olundu"){
          this.toastr.success('Your record was successfully added');
          this.route.navigate(['login']);
        }
      },
      error: (err)=>console.log(err)
    });
  }

}
