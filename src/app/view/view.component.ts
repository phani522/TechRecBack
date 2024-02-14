import { Component, OnInit } from '@angular/core';
import { AdminService, CandidateFullInfo, Recruiter } from '../Service/admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {Sort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{
  constructor(private service:AdminService, private router:Router){

  }

  ngOnInit(): void {
    this.getAllCandidates();
    console.log('Recruiters are ');
    this.getAllRecruiters();
    this.sortedData = this.recruiters.slice();
  }

  recruiters:Recruiter[]=[];
  candidates:CandidateFullInfo[]=[];
  

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.recruiters);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  getAllRecruiters(){
    this.service.getRecruiters().subscribe(
      data=>{
        this.recruiters=data as Recruiter[];
        console.log(this.recruiters);
      }
    );
  }

  getAllCandidates(){
    this.service.getCandidates().subscribe(
      data=>{
        this.candidates=data as CandidateFullInfo[];
        console.log(this.candidates);
      }
    );
  }

  sortedData:Recruiter[]=[];
  sortData(sort: Sort) {
    const data = this.recruiters.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.fname, b.fname, isAsc);
        case 'calories':
          return compare(a.lname, b.lname, isAsc);
        default:
          return 0;
      }
    });
  }


}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

