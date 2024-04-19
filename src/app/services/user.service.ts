import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public client: HttpClient) { }

  createUser(user){
    return this.client.post('http://localhost:3000/api/v1/user/signup', user);
  }

  loginUser(user){
    return this.client.post('http://localhost:3000/api/v1/user/login',user);
  }
}
