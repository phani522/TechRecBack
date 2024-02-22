import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService, Candidate, Recruiter } from '../Service/admin.service';

@Injectable()
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent implements OnInit{

  constructor(private snackBar: MatSnackBar, private service:AdminService){

  }
ngOnInit(): void {
  //this.form.controls['type'].setValidators([Validators.required]);
}
  recruiter:Recruiter={id:'',fname:'',lname:'',phone:''};
  candidate:Candidate={id:'',fname:'',lname:'',phone:'',tech:''};
  selected:string='candidate';
  add(form:NgForm){
  if(form.valid){
    if(this.selected === 'recruiter'){
    this.recruiter.fname=form.value.fname;
    this.recruiter.lname=form.value.lname;
    this.recruiter.phone=form.value.phone;
    this.recruiter.id=this.generateUsername(form.value.lname,form.value.phone);
    this.service.addRecruiter(this.recruiter).subscribe(
      data=>console.log(data)
    );
    }
    else{
      this.candidate.fname=form.value.fname;
      this.candidate.lname=form.value.lname;
      this.candidate.phone=form.value.phone;
      this.candidate.tech=form.value.tech;
      this.candidate.id=this.generateUsername(form.value.lname, form.value.phone);
      this.service.addCandidate(this.candidate).subscribe(
        data=>console.log(data)
      );

    }
    this.openSnackBar('submitted successfully');
    form.reset();
  }
  else{
    this.openSnackBar('Please fill in all required fields');
  }

  }

  generateUsername(lname:string, phone:string){
    const user=lname.toLowerCase()+'@'+phone.slice(-4);
    return user;
  }

  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
