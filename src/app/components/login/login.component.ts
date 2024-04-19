import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:string;
  pwd:string;
  errorMsg: string;
  constructor(public userService: UserService, public router: Router) {}

  onFormChange() {

    if(!this.user || !this.pwd ){
      this.errorMsg = "* All Filed are mandatory";
      return;
    }

    this.errorMsg = '';
  }

  onSubmit(){
    if(!(this.errorMsg === '')){
      alert("Error on form, please try again");
      return;
    }

    this.userService.loginUser({user: this.user, password: this.pwd}).subscribe({
      next: (value) => {
        console.log(value);

        if(value['status'] === 'success'){
          this.router.navigate(['/']);
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
