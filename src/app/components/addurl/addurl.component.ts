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
  monitor: boolean = true;

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
  checkCheckBoxvalue(event){
    this.monitor = event.target.checked;
    console.log(this.monitor);

  }

  onSubmit(){
    let urlObj = {
      name: this.name,
      url: this.url,
      interval: +this.interval,
      monitor: this.monitor
    }
    // console.log(urlObj);

    this.urlService.addUrl(urlObj).subscribe(data => {
      this.message = data;
      console.log(this.message);
      this.onSubmitComplete(this.message);

    }, err => {
      this.message = err;
    })

  }

  onSubmitComplete(urlDetails) {
    if(this.monitor){
      setTimeout(() =>{
        this.urlService.enableMonitor(urlDetails).subscribe(data => {
          this.message = data;
        console.log(this.message);
      }, err => {
        this.message = err;
        console.log(this.message);
        })
      }, 2000)
    }
  }

}
