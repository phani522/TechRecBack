import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface Recruiter{
    id:string;
    fname:string;
    lname:string;
    phone:string;
}

export interface Candidate{
    fname:string;
    lname:string;
    phone:string;
    tech:string;
}
export interface CandidateFullInfo{
    fname:string;
    lname:string;
    phone:string;
    tech:string;
    recruiterId:Number[];
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
        return this.http.get('http://localhost:8081/getCandidates')
    }
}