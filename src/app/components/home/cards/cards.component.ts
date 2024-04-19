import { Component } from '@angular/core';
import { UrlService } from '../../../services/url.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  urlData = {
    "url": [],
    "monitor": []
  };

  availableCount = 0;
  unavailableCount = 0;
  activeCount = 0;

  error1: boolean = false;
  error2: boolean = false;

  constructor(public service: UrlService) {}

  ngAfterViewInit(){
    this.service.getAllUrls().subscribe(
      (value) =>{
        // console.log(value['data']);

        this.urlData['monitor'] = value['data'];
        for(let item of this.urlData['monitor']){
          if (!item.statusCode){
            ++this.unavailableCount
          }else if(item.statusCode <400){
            ++this.availableCount
          }else if (item.statusCode >= 400) {
            ++this.unavailableCount
          }
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.error1 = true;
      }
      )

      this.service.getInputsList().subscribe({
        next: (value) => {

          this.urlData['url'] = value['data'];
          console.log(this.urlData);
          for(let item of value['data']) {
            if(item.monitor){
              ++this.activeCount;
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error2 = true;
        }
      })

    }

    refreshCard() {
      this.availableCount = 0;
      this.unavailableCount = 0;
      this.activeCount = 0;
      this.urlData = {
        "url": [],
        "monitor": []
      };
      this.ngAfterViewInit()
    }


}
