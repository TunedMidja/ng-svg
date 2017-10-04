import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Istat} from '../interfaces';

@Component({
  selector: 'app-bar-chart',
  template: `
    <div>
      <svg [attr.width]="width" [attr.height]="height">
        <svg:g>
          <svg:line [attr.x1]="legendMargin" y1="0" [attr.x2]="legendMargin" [attr.y2]="width-legendMargin" [attr.stroke-width]="axisStrokeWidth" [attr.stroke]="axisColor"></svg:line>
          <svg:line [attr.x1]="legendMargin" [attr.y1]="height-legendMargin" [attr.x2]="width" [attr.y2]="width-legendMargin" [attr.stroke-width]="axisStrokeWidth" [attr.stroke]="axisColor"></svg:line>
          <rect [attr.x]="legendMargin" y="20" width="50" height="330" style="fill: blue; stroke: darkblue; stroke-width: 1; fill-opacity: 0.5; stroke-opacity: 0.8" />
          <rect [attr.x]="legendMargin + 100" y="120" width="50" height="230" style="fill: blue; stroke: darkblue; stroke-width: 1; fill-opacity: 0.5; stroke-opacity: 0.8" />
        </svg:g>
      </svg>
    </div>
  `,
  styles: []
})
export class BarChartComponent implements OnInit {
  private width = 400;
  private height = 400;
  private legendMargin = 50;
  private axisStrokeWidth = 2;
  private axisColor = 'black';

  stats: Istat[];

  constructor(private dataService: DataService) {
    this.stats = this.dataService.getStats();
  }

  ngOnInit() {
  }
}
