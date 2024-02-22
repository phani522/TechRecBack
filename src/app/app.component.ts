import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechsterAdmin';
  check=false;
  checkRecruiter=false;
  constructor(private router:Router, private cdr: ChangeDetectorRef){

  }
  ngOnInit() {
    console.log('ngOnInit: checkRecruiter', this.checkRecruiter);
  }

  checkLogin(data:boolean){
    console.log('checking login method');
    console.log(' admin login is '+data);
    if(data === true){
      this.check=true;
      this.router.navigate(['/add']); 
    }
    
  }

  checkLoginRecruiter(data:boolean){

    console.log('recruiter login is '+data);
    if(data === true){
      this.checkRecruiter=true;
      this.cdr.detectChanges();
      //this.router.navigate(['/add']); 
      //console.log('the recruiter div is '+this.checkRecruiter);
    }
  }

}
