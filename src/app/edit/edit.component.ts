import { Component, OnInit } from '@angular/core';
import { AdminService, Candidate, RecruiterFullInfo } from '../Service/admin.service';
import { RecruiterService } from '../Service/recruiter.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  constructor(private service:AdminService, private recruiterService: RecruiterService){

  }

  recId:string='';
  recruiter!:RecruiterFullInfo;
  candidates:Candidate[]=[];

  candidateColumns:string[]=['fname','lname','phone'];
  ngOnInit(): void {
      this.recruiterService.loggedInRecruiter$.subscribe(
        (recruiterId)=>this.recId=recruiterId as string
      );
      this.service.getRecruiterById(this.recId).subscribe(
        data=>{
          console.log('data is '+data);
          this.recruiter=data as RecruiterFullInfo;
          console.log('recruiter is '+this.recruiter);
      this.candidates=this.recruiter.candidates;
      console.log('candidates are '+this.candidates);
        }
      );
  }


}
