import { Component, OnInit } from '@angular/core';
import { GraphComponent } from '../graph/graph.component';
import { ControlsComponent } from '../controls/controls.component';
import { DataService } from 'app/data.service';
import { Istat } from 'app/interfaces';

@Component({
  selector: 'app-stats',
  template: `
  <app-controls></app-controls>
  <app-graph></app-graph>
  <app-dataview [stats]="stats"></app-dataview>
  `,
  styles: [],
  providers: [DataService]
})
export class StatsComponent implements OnInit {
  stats: Istat[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.stats = this.dataService.getStats();
  }

}
