import { AfterViewInit, Component , ElementRef, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import { UrlService } from '../../../services/url.service';
import { UrlDetails } from 'src/app/models/url.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit{

  constructor(public urlService: UrlService, public renderer: Renderer2){}

  displayedColumns: string[] = ['id', 'name', 'url', 'status', 'status code', 'last scanned'];
  searchText: string = '';
  sortToggleValue = '';
  ELEMENT_DATA: any;
  dataSource: any;
  currentDate = new Date().getTime();
  showDetailsToggle:boolean = false;

  errMessage = false;

  @ViewChildren('sort') components;
  @ViewChild('loader', {static: true}) loader: ElementRef;


  ngAfterViewInit(){

    this.errMessage = false;
    // this.renderer.addClass(this.loader,'showLoader')
    this.loader.nativeElement.classList.add('showLoader');
    this.urlService.getAllUrls().subscribe((value) =>{
      this.dataSource = value['data'];
      this.ELEMENT_DATA = this.dataSource;
      console.log(this.dataSource);
      this.loader.nativeElement.classList.remove('showLoader');
    },(err) => {
      console.log(err);
      this.errMessage = true;
      this.loader.nativeElement.classList.remove('showLoader');
    })


  }

  refreshTable(){
    this.ngAfterViewInit();

  }


  onValueChange(){
    // console.log(this.searchText)
    if(!this.searchText) {
      this.dataSource = this.ELEMENT_DATA;
    }else {
      this.dataSource = this.ELEMENT_DATA.filter((val) => {
        return val.url.url.toLowerCase().includes(this.searchText.toLowerCase())
      });
    }
    // console.log(this.dataSource)
  }

  sortToggle(sort) {
    // console.log(this.dataSource);

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
    // console.log(this.sortToggleValue, sort.id);

    this.dataSource.sort((a,b) => {
      if(this.sortToggleValue == 'asc' && sort.id == 'id'){
        if(a._id < b._id) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'id'){
        if(a._id > b._id) return -1;
      }else if(this.sortToggleValue == 'asc' && sort.id == 'name'){
        if(a.url.name.toLowerCase() < b.url.name.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'name'){
        if(a.url.name.toLowerCase() > b.url.name.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'asc' && sort.id == 'url'){
        if(a.url.url.toLowerCase() < b.url.url.toLowerCase()) return -1;
      }else if(this.sortToggleValue == 'desc' && sort.id == 'url'){
        if(a.url.url.toLowerCase() > b.url.url.toLowerCase()) return -1;
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
    // console.log(this.dataSource)
  }

  showDetails(event){
    console.log(event)
    this.showDetailsToggle = true;
  }
}
