import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';


@Component({
  selector: 'app-addurl',
  templateUrl: './addurl.component.html',
  styleUrls: ['./addurl.component.css']
})
export class AddurlComponent {

  constructor(public urlService: UrlService, public router: Router){}

  url: string;
  name: string;
  interval: string;

  isEmpty: boolean;
  isValidForm: boolean = false;
  isValidUrl: boolean = true;
  isValidInterval: boolean = true;
  message;

  ngDoCheck(){
    if(this.url == undefined || this.url ==""  || this.name == undefined || this.name =="" || this.interval == undefined || this.interval == ""){
      this.isEmpty = true;
    }else{
      this.isEmpty = false;
    }
  }

  validateEmail(){
    let urlPattern = new RegExp("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")
    this.isValidUrl = urlPattern.test(this.url);
    console.log(this.isValidUrl)
  }

  validateInterval() {
    try{
      if(isNaN(+this.interval)){
        this.isValidInterval = false;
      }else if (+this.interval <5 || +this.interval > 1296000){
        this.isValidInterval = false;
      }else{
        this.isValidInterval = true;
      }
    }catch(err){
      console.log(err)
    }
  }

  onSubmit(){
    let urlObj = {
      name: this.name,
      url: this.url,
    }
    console.log(urlObj);

    this.urlService.addUrl(urlObj).subscribe((res) => {
      this.message = res;
      console.log(this.message);

      if(this.message){
        setTimeout(() => {
          this.router.navigate(['']);
        }, 500);
      }
    })
  }

}
