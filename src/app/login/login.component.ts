import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  username="admin";
  password="admin";
  user='';
  pass='';
  isLogin=false;
  @Output() loginEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  onSubmit(){
    console.log('user is '+this.user+' password is '+this.pass);
    if(this.user === this.username && this.pass === this.password){
      this.isLogin=true;
      console.log('login done');
    }
    else{
      alert('credentials are incorrect')
      this.user='';this.pass='';
    }
    this.loginEvent.emit(this.isLogin);
  }

  onReset(){
    this.user='';this.pass='';
   
  }

}
