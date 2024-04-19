import { Component, ElementRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @ViewChild('home') home: ElementRef;
  @ViewChild('add') add: ElementRef;
  @ViewChild('input') input: ElementRef;

  constructor(public router: Router) {}

  ngAfterViewInit() {
    if (this.router.url){
      if(this.router.url === '/') {
        this.home.nativeElement.classList.add(['active']);
        console.log(this.home);
      }else if(this.router.url === '/addurl') {
        this.add.nativeElement.classList.add(['active']);
        console.log(this.home);
      }
      else if(this.router.url === '/listurl') {
        this.input.nativeElement.classList.add(['active']);
        console.log(this.home);
      }

    }
  }

  signOut() {
    document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    alert('You have been logged out!')
    this.router.navigate(['/login']);
  }
}
