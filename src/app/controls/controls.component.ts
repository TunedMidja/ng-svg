import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { Istat } from 'app/interfaces'

// app-controls is a bunch of knobs/dials/buttons to change the svg

@Component({
  selector: 'app-controls',
  template: `
  <div>  
    <div *ngFor="let stat of stats">
      <label>{{stat.label}}</label>
      <input type="range" [(ngModel)]="stat.value" min="0" max="100">
      <span>{{stat.value}}</span>
      <button (click)="removeStat(stat)" class="remove">X</button>
    </div>
    <form id="add">
      <input name="newlabel" [(ngModel)]="newLabel">
      <button (click)="addStat()">Add a Stat</button>
    </form>
  </div>
  `,
  styles: []
})
export class ControlsComponent implements OnInit {
  newLabel: string;
  stats: Istat[];
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.stats = this.dataService.getStats();
  }

  addStat() {
    if (!this.newLabel) { return; } // do nothing if empty
    this.dataService.addStat(this.newLabel);
    this.newLabel = '';
  }
  removeStat(s: Istat) {
    this.dataService.removeStat(s);
  }

}

