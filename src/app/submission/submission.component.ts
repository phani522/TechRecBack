import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService, Candidate, CandidateFullInfo, RecruiterFullInfo, Submission } from '../Service/admin.service';
import { RecruiterService } from '../Service/recruiter.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.css'
})
export class SubmissionComponent implements OnInit {

  constructor(private service:AdminService, private recruiterService: RecruiterService){

  }
  recruiter!:RecruiterFullInfo;
recId:string='';
candidates: Candidate[] = []; 
selectedCandidateId:string='';

ngOnInit(): void {
  this.recruiterService.loggedInRecruiter$.subscribe((recruiterId)=>{
    this.recId=recruiterId as any;
  });
  console.log(' logged in recruiter is '+this.recId);
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

  givenRole:string='';
  givenCompany:string='';
  submission!:Submission;
  onSubmit(userform:NgForm){
    this.submission = this.submission || {};
    this.submission.company = userform.value.companyName;
    this.submission.recId = this.recId;
    this.submission.role=this.givenRole;
    this.submission.candId = this.selectedCandidateId;
    const current = new Date();
    const date=current.toISOString();
    this.submission.timestamp=date;
    console.log('submission is ', this.submission);
    this.service.doSubmit(this.submission).subscribe();

  } 
}