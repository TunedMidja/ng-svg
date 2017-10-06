import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Istat} from '../interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-bar-chart',
  template: `
    <app-controls></app-controls>
    <div style="height: 20px;"></div>
    <div>
      <svg [attr.width]="width" [attr.height]="height">
        <svg:g>
          <svg:line [attr.x1]="legendMargin" y1="0" [attr.x2]="legendMargin" [attr.y2]="width-legendMargin" [attr.stroke-width]="axisStrokeWidth" [attr.stroke]="axisColor"></svg:line>
          <svg:line [attr.x1]="legendMargin" [attr.y1]="height-legendMargin" [attr.x2]="width" [attr.y2]="width-legendMargin" [attr.stroke-width]="axisStrokeWidth" [attr.stroke]="axisColor"></svg:line>
          <svg:rect *ngFor="let stat of stats; index as i" [attr.x]="legendMargin + i * (barWidth + spaceBetweenBars)" [attr.y]="getYStart(stat)" [attr.height]="getHeight(stat)" [attr.width]="barWidth" />
        </svg:g>
      </svg>
    </div>
    <app-dataview [stats]="stats"></app-dataview>
  `,
  styles: [`
    rect {
      fill: blue; stroke: darkblue; stroke-width: 1; fill-opacity: 0.5; stroke-opacity: 0.8
    }
  `]
})
export class BarChartComponent implements OnInit, OnDestroy {
  private width = 400;
  private height = 400;
  private legendMargin = 50;
  private graphWidth = this.width - this.legendMargin;
  private graphHeight = this.height - this.legendMargin;
  private axisStrokeWidth = 2;
  private axisColor = 'black';
  private barWidth = 10;
  private spaceBetweenBars = 5;
  private barToSpaceRatio = 5;
  private verticalBarScale = 1;
  private statsSubscription;

  stats: Istat[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.initBarChart(this.dataService.getStats());

    this.statsSubscription = this.dataService.getStatsObservable().subscribe(stats => {
      this.initBarChart(stats);
    });
  }

  ngOnDestroy() {
    this.statsSubscription.unsubscribe();
  }

  private getHeight(point: Istat): number {
    return point.value * this.verticalBarScale;
  }

  private getYStart(point: Istat): number {
    return this.height - point.value * this.verticalBarScale - this.legendMargin;
  }

  private initBarChart(stats: Istat[]) {
    this.stats = stats;
    this.barWidth = this.graphWidth / (this.stats.length + this.stats.length / this.barToSpaceRatio);
    this.spaceBetweenBars = this.barWidth / this.barToSpaceRatio;

    const max = _.maxBy(this.stats, point => {
      console.log('point:', point);
      return point.value;
    });

    this.verticalBarScale = this.graphHeight / max.value;
  }
}
