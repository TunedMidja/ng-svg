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
          <svg:rect *ngFor="let stat of stats; index as i" [attr.x]="legendMargin + i * (barWidth + 10)" [attr.y]="getYStart(stat)" [attr.height]="getHeight(stat)" [attr.width]="barWidth" />
        </svg:g>
      </svg>
    </div>
  `,
  styles: [`
    rect {
      fill: blue; stroke: darkblue; stroke-width: 1; fill-opacity: 0.5; stroke-opacity: 0.8
    }
  `]
})
export class BarChartComponent implements OnInit {
  private width = 400;
  private height = 400;
  private legendMargin = 50;
  private axisStrokeWidth = 2;
  private axisColor = 'black';
  private barWidth = 60;

  stats: Istat[];

  constructor(private dataService: DataService) {
    this.stats = this.dataService.getStats();
  }

  ngOnInit() {
  }

  getHeight(point: Istat): number {
    return point.value;
  }

  getYStart(point: Istat): number {
    return this.height - point.value - this.legendMargin;
  }
}
