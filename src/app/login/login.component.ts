import { Component, EventEmitter, Output } from '@angular/core';
import { AdminService, RecruiterLogin } from '../Service/admin.service';
import { RecruiterService } from '../Service/recruiter.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service:AdminService, private recruiterService : RecruiterService){

  }
  hide = true;
  username="admin";
  password="admin";
  user='';
  pass='';
  isLogin=false;
  isLoginRecruiter=false;
  @Output() loginEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loginRecruiterEvent:EventEmitter<boolean>=new EventEmitter();
  onSubmit(){
    console.log('user is '+this.user+' password is '+this.pass);
    if(this.user === this.username && this.pass === this.password){
      this.isLogin=true;
      console.log('login done');
    }
    else{
     this.recruiterLogin();
      
    }
    this.loginEvent.emit(this.isLogin);
  }

  onReset(){
    this.user='';this.pass='';
   
  }
  recruiterLogins!:RecruiterLogin[];
  recruiterLogin(){

    this.service.getRecruitersLoginInfo().subscribe(
      data=>{
        this.recruiterLogins=data as RecruiterLogin[];
        for(const recLogin of this.recruiterLogins){
          if(this.user === recLogin.id && this.pass === recLogin.password){
            this.isLoginRecruiter=true;
            console.log('recruiter login');
            this.recruiterService.setLoggedInRecruiter(recLogin.id);
          }
        }
    
        if(this.isLoginRecruiter === false){
          alert('credentials are incorrect');
          this.user='';this.pass='';
        }
        this.loginRecruiterEvent.emit(this.isLoginRecruiter);
      }
    );
    
  }

}
