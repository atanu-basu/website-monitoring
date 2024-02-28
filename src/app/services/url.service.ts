import { Injectable } from '@angular/core';
import { UrlDetails} from '../models/url.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  ELEMENT_DATA: UrlDetails[] = [
    {id: 1, name: 'Google', url: 'https://google.com', status: 'Up',statusCode: 200, lastScanned: new Date()},
    {id: 2, name: 'Facebook', url: 'https://facebook.com', status: 'Up', statusCode: 200,lastScanned: new Date()},
    {id: 3, name: 'Gmail', url: 'https://mail.google.com', status: 'Down',statusCode: 500,lastScanned: new Date()},
    {id: 4, name: 'Youtube', url: 'https://youtube.com', status: 'Up',statusCode: 200,lastScanned: new Date()},
    {id: 5, name: 'Twitter', url: 'https://x.com', status: 'Up', statusCode: 200,lastScanned: new Date()},
    {id: 6, name: 'Racing', url: 'https://f1tv.com', status: 'Up', statusCode: 200,lastScanned: new Date()},
  ];

  getAllUrls(){
    return new Observable<UrlDetails[]>((obs) => {
      obs.next(this.ELEMENT_DATA)
    });
  }

  addUrl(url){

    let urlObj = {
      id: this.ELEMENT_DATA.length + 1,
      name: url.name,
      url: url.url,
      status: 'Up',
      statusCode: 200,
      lastScanned: new Date()
    }
    this.ELEMENT_DATA.push(urlObj);

    return new Observable((obs) => {
      setTimeout(() => {
        obs.next({status: 'Succesfully added! '+ url.name});
      },2000);
    });
  }
}
