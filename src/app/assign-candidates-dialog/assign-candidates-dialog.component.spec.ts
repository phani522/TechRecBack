import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCandidatesDialogComponent } from './assign-candidates-dialog.component';

describe('AssignCandidatesDialogComponent', () => {
  let component: AssignCandidatesDialogComponent;
  let fixture: ComponentFixture<AssignCandidatesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignCandidatesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignCandidatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
