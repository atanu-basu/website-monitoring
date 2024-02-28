import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddurlComponent } from './components/addurl/addurl.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'addurl', component: AddurlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
