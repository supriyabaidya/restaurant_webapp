import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    // return Promise.resolve(LEADERS);
    // return new Promise(paramFnResolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => paramFnResolve(LEADERS), 2000);
    // });
    return of(LEADERS).pipe(delay(200));
  }

  getLeader(id: string): Observable<Leader> {
    // return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
    // return new Promise(paramFnResolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => paramFnResolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    // });
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(200));
  }

  getFeaturedLeader(): Observable<Leader> {
    // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    // return new Promise(paramFnResolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => paramFnResolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    // });
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(200));
  }
}
