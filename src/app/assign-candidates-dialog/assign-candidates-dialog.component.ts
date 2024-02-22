// assign-candidates-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-candidates-dialog',
  templateUrl: './assign-candidates-dialog.component.html',
  styleUrls: ['./assign-candidates-dialog.component.css']
})
export class AssignCandidatesDialogComponent {

  selectedCandidate: any;

  candidates: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AssignCandidatesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { candidates: any[] }
  ) {
    console.log('candidates in dialog are ', this.data.candidates);
  }

  assignCandidate(): void {
    if (this.selectedCandidate) {
      this.dialogRef.close(this.selectedCandidate.id);
    }
  }
}
