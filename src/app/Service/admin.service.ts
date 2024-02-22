import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface Recruiter{
    id:string;
    fname:string;
    lname:string;
    phone:string;
 
}
export interface RecruiterLogin{
    id:string;
    password:string;
}
export interface RecruiterFullInfo{
    id:string;
    fname:string;
    lname:string;
    phone:string;
    candidates:Candidate[];
}


export interface Candidate{
    id:string;
    fname:string;
    lname:string;
    phone:string;
    tech:string;
}
export interface CandidateFullInfo{
    id:string;
    fname:string;
    lname:string;
    phone:string;
    tech:string;
    recInCand:Recruiter[];
}
export interface Submission{
    company:string;
    recId:string;
    candId:string;
    timestamp:string;
    role:string;
}

@Injectable()
export class AdminService{

    constructor(private http:HttpClient){
    }

    addRecruiter(recruiter:Recruiter){
       return this.http.post('http://localhost:8081/addRecruiter', recruiter);
    }

    addCandidate(candidate:Candidate){
        return this.http.post('http://localhost:8081/addCandidate', candidate);
    }

    getRecruiters(){
        return this.http.get('http://localhost:8081/getRecruiters');
    }

    getCandidates(){
        return this.http.get('http://localhost:8081/getCandidates');
    }

    assignCandidate(candidate:Candidate, id:string){
        return this.http.put('http://localhost:8081/assignCandidate/'+id, candidate);
    }
    deleteRecruiter(recruiterId:string){
        return this.http.delete('http://localhost:8081/deleteRecruiter/'+recruiterId);
    }
       
    deleteCandidate(candId:string){
        return this.http.delete('http://localhost:8081/deleteCandidateFull/'+candId);
    }
      
    deleteCandidateofRecruiter(recId:string, candId:string){
        return this.http.delete('http://localhost:8081/deleteCandidate/'+recId+'/'+candId);
       
    }

    getRecruitersLoginInfo(){
        return this.http.get('http://localhost:8081/getRecruitersLogin');
    }
    getRecruiterById(recId:string){
        return this.http.get('http://localhost:8081/getRecruiterById/'+recId);
    }

    getCandidateById(candId:string){
        return this.http.get('http://localhost:8081/getCandidateById/'+candId);
    }

    doSubmit(submission:Submission){
        return this.http.post('http://localhost:8081/createSubmission', submission);
    }
    getAllSubmissons(){
        return this.http.get('http://localhost:8081/getAllSubmissions');
    }
}