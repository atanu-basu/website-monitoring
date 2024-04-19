import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {


  constructor(public urlService: UrlService) {

  }
  submitted = false;
  @Input() urlItem;



  urlName;
  urlAddress;
  urlInterval;

  isValidForm = true;

  @Output() closeFormEvent = new EventEmitter();

  @ViewChild('name') name;
  @ViewChild('address') address;
  @ViewChild('intervalTime') intervalTime;

  ngOnInit(){
    this.urlName = this.urlItem.name;
    this.urlAddress = this.urlItem.url;
    this.urlInterval = this.urlItem.interval;
    // console.log(this.editForm);

  }

  ngDoCheck(){
    // console.log('Change');
    // console.log(this.name);
    // console.log(this.address);
    // console.log(this.intervalTime);

    if(this.urlName.length < 2){
      this.name.control.status = "INVALID";
      this.isValidForm = false;
      return;
    }

    let urlPattern = new RegExp("^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$");
    console.log(urlPattern.test(this.urlAddress));

    if(!urlPattern.test(this.urlAddress)){
      this.address.control.status = "INVALID";
      this.isValidForm = false;
      return;
    }

    if(this.urlInterval <= 5 || this.urlInterval > 2592000){
      this.intervalTime.control.status = "INVALID";
      this.isValidForm = false;
      return;
    }

    this.isValidForm = true;
  }


  onClose(){
    this.closeFormEvent.emit(false);
  }

  onSubmit(){
    this.submitted = true;
    let urlObj = {
      _id: this.urlItem._id,
      name: this.urlName,
      url: this.urlAddress,
      interval: this.urlInterval
    }
    console.log(this.urlItem._id);

    this.urlService.updateUrl(this.urlItem,urlObj).subscribe(data => {
      if(data['status'] === 'success') {
        alert('Update Successful');
        this.onClose();
      }

    }, (err:HttpErrorResponse) => {
      console.log(err);
    })


  }
}
