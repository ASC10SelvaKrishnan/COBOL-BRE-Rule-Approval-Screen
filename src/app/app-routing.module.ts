import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent } from './home/home.component';
import {RuleDetailsComponent } from './rule-details/rule-details.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'rule-details', component:RuleDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }