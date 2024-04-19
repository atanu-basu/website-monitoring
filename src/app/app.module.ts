import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/home/table/table.component';
import { FormsModule } from '@angular/forms';
import { AddurlComponent } from './components/addurl/addurl.component';
import { NavComponent } from './components/home/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { InputsComponent } from './components/inputs/inputs.component';
import { EditComponent } from './components/inputs/edit/edit.component';
import { CardsComponent } from './components/home/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { SiteDetailsComponent } from './components/home/table/site-details/site-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    AddurlComponent,
    NavComponent,
    InputsComponent,
    EditComponent,
    CardsComponent,
    LoginComponent,
    SignupComponent,
    SiteDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
