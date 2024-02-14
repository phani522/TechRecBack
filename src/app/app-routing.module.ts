import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { DisplayComponent } from './display/display.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'add',component:AddPersonComponent},
  {path:'display',component:DisplayComponent},
  {path:'view',component:ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
