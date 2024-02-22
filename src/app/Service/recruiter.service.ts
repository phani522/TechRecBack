// recruiter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {
  private loggedInRecruiterSubject = new BehaviorSubject<string | null>(null);
  loggedInRecruiter$ = this.loggedInRecruiterSubject.asObservable();

  setLoggedInRecruiter(recruiterId: string | null): void {
    this.loggedInRecruiterSubject.next(recruiterId);
  }
}
