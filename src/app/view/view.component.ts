import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService, Candidate, CandidateFullInfo, Recruiter, RecruiterFullInfo } from '../Service/admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {Sort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssignCandidatesDialogComponent } from '../assign-candidates-dialog/assign-candidates-dialog.component';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ViewsubmissionComponent} from '../viewsubmission/viewsubmission.component';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
  
})
export class ViewComponent implements OnInit{
  constructor(private service:AdminService, private router:Router, private dialog: MatDialog, private snackBar:MatSnackBar){

  }

  candidateToBeAssigned!:Candidate;
  
  ngOnInit(): void {
    this.getAllCandidates();
    //console.log('Recruiters are ');
    this.getAllRecruiters();
    // this.sortedData = this.recruiters.slice();
  }

  recruiters:RecruiterFullInfo[]=[];
  candidates:CandidateFullInfo[]=[];
  

  //@ViewChild('ViewsubmissionComponent') viewsub!: ViewsubmissionComponent;
  //displayedColumns: any= ['id','fname', 'lname', 'phone'];
  dataSource:Recruiter[]=[];

  expandedRecruiters: any[] = [];
  toggleSubmissions(recruiter:Recruiter){
    if (this.expandedRecruiters.includes(recruiter)) {
      this.expandedRecruiters = this.expandedRecruiters.filter((r) => r !== recruiter);
    } else {
      this.expandedRecruiters.push(recruiter);
    }
  }
  getAllRecruiters(){
    this.service.getRecruiters().subscribe(
      data=>{
        this.recruiters=data as RecruiterFullInfo[];
        console.log('Recruiters are :'+this.recruiters);
      }
    );
   //this.dataSource = this.recruiters;
   //console.log('dataSource is '+this.dataSource);

  }
candidateColumns:string[] = ['fname','lname','phone','tech','Delete'];
recruiterColumns:string[]=['fname','lname','phone','id','Delete'];

  getAllCandidates(){
    this.service.getCandidates().subscribe(
      data=>{
        this.candidates=data as CandidateFullInfo[];
        console.log(this.candidates);
      }
    );
  }


  tabChanged(tab:number){

    // if(tab ===2){
    //   this.viewsub.getAllSubmissions();
    // }
  }
  openAssignCandidatesDialog(id:string): void {
    

    const dialogRef = this.dialog.open(AssignCandidatesDialogComponent, {
      width: '500px',
      data: { candidates: this.candidates },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      // Handle the result if needed (result contains the selected candidate IDs)
      if (result) {
        // Perform the assignment logic here
        for(const candidate of this.candidates){
          if(candidate.id === result){
            this.candidateToBeAssigned=candidate;
            break;
          }
        }
        this.service.assignCandidate(this.candidateToBeAssigned,id).subscribe(
          data=>{
            this.getAllCandidates();
        this.getAllRecruiters();
          },
          error=>{
            this.getAllCandidates();
            this.getAllRecruiters();
          }
        );
        
        console.log('result is ' + result);
      }
    });
  }

  deleteCandidateofRecruiter(recruiterId:string, candId:string){
    this.service.deleteCandidateofRecruiter(recruiterId,candId).subscribe(
      data=>{
        this.getAllCandidates();
        this.getAllRecruiters();

      },
      error=>{
        this.getAllCandidates();
        this.getAllRecruiters();
      }
    );
    this.openSnackBar('Candidate of the recruiter Deleted');
    //alert('Candidate of the recruiter removed ');
  }

  deleteCandidate(candId:string){

    this.service.deleteCandidate(candId).subscribe(
      data=>{
        this.getAllCandidates();
        this.getAllRecruiters();

      },
      error=>{
        this.getAllCandidates();
        this.getAllRecruiters();
      }
    );
    this.openSnackBar('Candidate removed successfully');
    //alert('Candidate removed successfully');
  }

  deleteRecruiter(recruiterId:string){
    this.service.deleteRecruiter(recruiterId).subscribe(
      data=>{
        this.getAllCandidates();
        this.getAllRecruiters();

      },
      error=>{
        this.getAllCandidates();
        this.getAllRecruiters();
      }
    );
    this.openSnackBar('recruiter removed successfully');
   // alert('recruiter removed successfully');
  }
  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}