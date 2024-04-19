import { AfterViewInit, Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UrlInputModel } from 'src/app/models/url-input.model';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements AfterViewInit{

  dataSource;
  showForm = false;

  // input for edit component
  urlInputItem;
  errMessage = false;
  @ViewChild('loader') loader: ElementRef;

  itemTobeDeleted;

  displayColumns= ['name', 'url', 'interval', 'enable/disable', 'actions']
  constructor(public urlService:UrlService, public router: Router){}

  ngAfterViewInit(){

    this.errMessage = false;
    this.loader.nativeElement.classList.add('showLoader');
    console.log('refresh');

    this.urlService.getInputsList().subscribe(
      data => {
        this.dataSource = data;
        console.log(this.dataSource);
        this.loader.nativeElement.classList.remove('showLoader');
      },
      err => {
        console.log(err);
        if(err.status === 401) {
          document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          alert('Session expired!, please login again.')
          this.router.navigate(['/']);
        }
        this.errMessage = true
        this.loader.nativeElement.classList.remove('showLoader');
      }
    )
  }

  onCheckboxChange(event,row){

    console.log(event, row);
    if(event.target.checked){
      row.monitor = event.target.checked;
      console.log("enable monitoring for :", row.url);
      this.urlService.enableMonitor({message: row}).subscribe(data =>{ console.log(data);
      }, err => {console.log(err) ;
      })
    }else{
      console.log("disable monitoring for", row.url);
      this.urlService.disableMonitor({url: row.url}).subscribe(
        data =>{ console.log(data);},
        err => { console.log(err);}
      )
    }

  }

  refreshTable(){
    this.ngAfterViewInit();
  }

  onEdit(item){
    this.showForm = true;

    this.urlInputItem = item;

  }
  closeForm(event) {
    this.showForm = false;
    this.ngAfterViewInit();
  }

  deleteRow(row){
    console.log(row._id);
    this.itemTobeDeleted = row._id;
  }

  confirmDelete(){
    this.urlService.deleteUrl(this.itemTobeDeleted).subscribe(
      (data) => {
        console.log(data);
        this.ngAfterViewInit();
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
