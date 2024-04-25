import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService, Submission } from '../Service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-viewsubmission',
  templateUrl: './viewsubmission.component.html',
  styleUrls: ['./viewsubmission.component.css']
})
export class ViewsubmissionComponent implements OnInit {
  startDate:Date=new Date();
  endDate:Date=new Date();
constructor(private service: AdminService){

}
ngOnInit(): void {
    this.getAllSubmissions();
}
// dataSource = new MatTableDataSource<Submission>();
// @ViewChild(MatPaginator) paginator!: MatPaginator;

dataSource= new MatTableDataSource<Submission>();
@ViewChild(MatPaginator) paginator!: MatPaginator;

submissionColumns:any=['company','role','recId','candId','timestamp']
submissions:Submission[]=[];
submissionsToFilter:Submission[]=[];
submissionsCopy:Submission[]=[];
selectedRecruiters:[]=[];
recruiters:{'name':string, selected:false}[]=[];
candidates:{'name':string, selected:false}[]=[];

getAllSubmissions(){
  this.service.getAllSubmissons().subscribe(
    data=>{
      this.submissions=data as Submission[];
      this.submissionsCopy=this.submissions;
      console.log('submissions are'+this.submissions);
      for(const sub of this.submissionsCopy){
        if(!this.recruiters.some((recruiter)=>recruiter.name === sub.recId))
        this.recruiters.push({name:sub.recId,selected:false});
        if(!this.candidates.some((candidate)=>candidate.name === sub.candId))
        this.candidates.push({name:sub.candId,selected:false});
      }
      // this.dataSource.data = this.submissions;
      //   this.dataSource.paginator = this.paginator;
      //console.log('recruiters are '+this.recruiters);
      this.dataSource.data = this.submissions;
      this.dataSource.paginator=this.paginator;
    }
  );
}
filterSubmissions(){

   this.submissionsToFilter=this.submissionsCopy;
  if (this.startDate && this.endDate) {
    
    this.endDate.setHours(23, 59, 59, 999);
    this.submissions = this.submissionsToFilter.filter((submission) => {
      const submissionDate = new Date(submission.timestamp);
      
      return (
        submissionDate >= this.startDate &&
        submissionDate <= this.endDate
      );
    });

  }
  if (this.recruiters.some((recruiter) => recruiter.selected)) {
    this.submissions = this.submissions.filter((submission) => {
      // Check if at least one selected recruiter matches the submission's recruiter
      return this.recruiters.some(
        (selectedRecruiter) => selectedRecruiter.selected && selectedRecruiter.name === submission.recId
      );
    });
  }

  if (this.candidates.some((candidate) => candidate.selected)) {
    this.submissions = this.submissions.filter((submission) => {
      // Check if at least one selected candidate matches the submission's candidate
      return this.candidates.some(
        (selectedCandidate) => selectedCandidate.selected && selectedCandidate.name === submission.candId
      );
    });
  }
}
}
