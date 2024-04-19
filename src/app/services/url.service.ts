import { Injectable } from '@angular/core';
import { UrlDetails } from '../models/url.model';
import { UrlInputModel } from '../models/url-input.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  headers = {
    "Accept": "*/*",
    "Access-Control-Allow-Origin": "*"
  }

  constructor(public client: HttpClient) { }

  getAllUrls(){
    return this.client.get('http://localhost:3000/api/v1/url/monitor')
  }

  getInputsList() {
    return this.client.get('http://localhost:3000/api/v1/url/');
  }

  addUrl(url: UrlInputModel){

    let urlObj = {
      name: url.name,
      url: url.url,
      interval: url.interval,
      monitor: url.monitor
    }

    return this.client.post('http://localhost:3000/api/v1/url/add', urlObj);

  }

  enableMonitor(url){

    return this.client.post('http://localhost:3000/api/v1/url/monitor/add', url, { headers : this.headers});
  }

  disableMonitor(url){

    return this.client.post('http://localhost:3000/api/v1/url/monitor/remove', url, { headers : this.headers});
  }

  updateUrl(oldurl, newurl){
    return this.client.post('http://localhost:3000/api/v1/url/update', {oldUrl: oldurl, newUrl: newurl}, {headers: this.headers});
  }

  deleteUrl(item){

    return this.client.delete('http://localhost:3000/api/v1/url/delete/'+item);
  }
}
