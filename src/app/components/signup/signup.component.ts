import { Component } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string;
  user: string;
  pwd: string;
  cnfPwd: string;

  errorMsg: string;

  constructor(public userService: UserService, public router: Router) {}


  onChangeForm(){
    // console.log(this.email,this.user,this.pwd,this.cnfPwd);

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)){
      this.errorMsg = "* Invalid Email";
      return;
    }

    if(!this.email || !this.user || !this.pwd || !this.cnfPwd){
      this.errorMsg = "* All Filed are mandatory";
      return;
    }

    if(!(this.pwd === this.cnfPwd)){
      this.errorMsg = "* Password did not match"
      return;
    }

    this.errorMsg = '';
  }


  onSubmit(){
    if(!(this.errorMsg === '')){
      alert("Error on form, please try again");
      return;
    }

    this.userService.createUser({email: this.email,user:this.user, password: this.pwd}).subscribe({
      next : (value) => {
        console.log(value);
        if(value['status'] === 'success'){
          alert("Your acount is succesfully registered");
          this.router.navigate(['/login']);
        }
      },
      error : (err) => {
        console.log(err);

      }
    });

  }
}
