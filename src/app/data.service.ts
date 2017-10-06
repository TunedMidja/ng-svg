import { Injectable } from '@angular/core';
import { Istat } from 'app/interfaces';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataService {
  private readonly statsObservableSubject = new Subject<Istat[]>();

  private stats: Istat[] = [
    {label: 'Combat', value: 90},
    {label: 'Endurance', value: 80},
    {label: 'Charm', value: 80},
    {label: 'Sneak', value: 60},
    {label: 'Magic', value: 100},
  ];

  constructor() { }

  getStats(): Istat[] {
    return this.stats;
  }

  getStatsObservable(): Observable<Istat[]> {
    return this.statsObservableSubject.asObservable();
  }

  addStat(newLabel: string) {
    if (!newLabel) { return; } // do nothing if empty
    this.stats.push({
      label: newLabel,
      value: 100
    });

    this.statsObservableSubject.next(this.stats);
  }

  removeStat(s: Istat) {
    if (this.stats.length > 3) {
      this.stats.splice(this.stats.indexOf(s), 1);
      this.statsObservableSubject.next(this.stats);
    } else {
      alert('You need at least 3 stats!');
    }
  }
}
