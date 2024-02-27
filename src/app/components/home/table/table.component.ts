import { Component , ElementRef, ViewChildren} from '@angular/core';


export interface PeriodicElement {
  name: string;
  id: number;
  url: string;
  status: string;
  statusCode: number;
  lastScanned: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Google', url: 'https://google.com', status: 'Up',statusCode: 200, lastScanned: new Date()},
  {id: 2, name: 'Facebook', url: 'https://facebook.com', status: 'Up', statusCode: 200,lastScanned: new Date()},
  {id: 3, name: 'Gmail', url: 'https://mail.google.com', status: 'Down',statusCode: 500,lastScanned: new Date()},
  {id: 4, name: 'Youtube', url: 'https://youtube.com', status: 'Up',statusCode: 200,lastScanned: new Date()},
  {id: 5, name: 'Twitter', url: 'https://x.com', status: 'Up', statusCode: 200,lastScanned: new Date()},
  {id: 6, name: 'Racing', url: 'https://f1tv.com', status: 'Up', statusCode: 200,lastScanned: new Date()},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns: string[] = ['id', 'name', 'url', 'status', 'status code', 'last scanned'];
  dataSource = ELEMENT_DATA;
  searchText: string = '';
  sortToggleValue = '';

  @ViewChildren('sort') components;

  onValueChange(){
    // console.log(this.searchText)
    if(!this.searchText) {
      this.dataSource = ELEMENT_DATA;
    }else {
      this.dataSource = ELEMENT_DATA.filter((val) => {
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
