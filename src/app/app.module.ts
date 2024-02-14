import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AddPersonComponent } from './add-person/add-person.component';
import { MatOption } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DisplayComponent } from './display/display.component';
import { ViewComponent } from './view/view.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from './Service/admin.service';
import { HttpClientModule } from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddPersonComponent,
    DisplayComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatOption,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    MatTableDataSource
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
