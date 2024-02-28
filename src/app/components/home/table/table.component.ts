import { Component , ElementRef, ViewChildren} from '@angular/core';
import { UrlService } from '../../../services/url.service';
import { UrlDetails } from 'src/app/models/url.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(public urlService: UrlService){}

  displayedColumns: string[] = ['id', 'name', 'url', 'status', 'status code', 'last scanned'];
  searchText: string = '';
  sortToggleValue = '';
  ELEMENT_DATA: UrlDetails[];
  dataSource: UrlDetails[];

  @ViewChildren('sort') components;

  ngOnInit(){

    this.urlService.getAllUrls().subscribe((data) => {
      this.ELEMENT_DATA = data;
      this.dataSource = data;
    });
    // console.log(this.ELEMENT_DATA);

  }


  onValueChange(){
    console.log(this.searchText)
    if(!this.searchText) {
      this.dataSource = this.ELEMENT_DATA;
    }else {
      this.dataSource = this.ELEMENT_DATA.filter((val) => {
        return val.url.toLowerCase().includes(this.searchText.toLowerCase())
      });
    }
    // console.log(this.dataSource)
  }

  sortToggle(sort) {
    if(this.sortToggleValue === ''){
      this.sortToggleValue = 'asc';
      document.getElementById(sort.id).innerHTML = "<i class='fa fa-sort-asc'></i>"

    }else if (this.sortToggleValue === 'asc'){
      this.sortToggleValue = 'desc';
      document.getElementById(sort.id).innerHTML = "<i class='fa fa-sort-desc'></i>"

    }else if(this.sortToggleValue === 'desc'){
      this.sortToggleValue = 'asc';
      document.getElementById(sort.id).innerHTML = "<i class='fa fa-sort-asc'></i>"

    }
    console.log(this.sortToggleValue, sort.id);

    this.dataSource.sort((a,b) => {
      if(this.sortToggleValue == 'asc' && sort.id == 'id'){
        if(a.id < b.id) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'id'){
        if(a.id > b.id) return -1;
      }else if(this.sortToggleValue == 'asc' && sort.id == 'name'){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'name'){
        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'asc' && sort.id == 'url'){
        if(a.url.toLowerCase() < b.url.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'url'){
        if(a.url.toLowerCase() > b.url.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'asc' && sort.id == 'status'){
        if(a.status.toLowerCase() < b.status.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'status'){
        if(a.status.toLowerCase() > b.status.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'asc' && sort.id == 'status code'){
        if(a.statusCode < b.statusCode) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'status code'){
        if(a.statusCode > b.statusCode) return -1;
      }else if(this.sortToggleValue == 'asc' && sort.id == 'last scanned'){
        if(a.lastScanned < b.lastScanned) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'last scanned'){
        if(a.lastScanned > b.lastScanned) return -1;
      }

      return 0;
    })
    console.log(this.dataSource)
  }

}
