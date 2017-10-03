import { Injectable } from '@angular/core';
import { Istat } from 'app/interfaces';

@Injectable()
export class DataService {
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

  addStat(newLabel: string) {
    if (!newLabel) { return; } // do nothing if empty
    this.stats.push({
      label: newLabel,
      value: 100
    });
  }
  removeStat(s: Istat) {
    if (this.stats.length > 3) {
      this.stats.splice(this.stats.indexOf(s), 1);
    } else {
      alert('you need atleast 3 stats!');
    }
  }
}



