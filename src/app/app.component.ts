import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechsterAdmin';
  check=false;
  constructor(private router:Router){

  }

  checkLogin(data:boolean){
    console.log('checking login method');
    console.log(' data is '+data);
    if(data === true){
      this.check=true;
      //this.router.navigate(['/display']);
    }
    
  }
}
