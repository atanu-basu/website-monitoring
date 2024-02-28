import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/home/table/table.component';
import { FormsModule } from '@angular/forms';
import { AddurlComponent } from './components/addurl/addurl.component';
import { NavComponent } from './components/home/nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    AddurlComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
