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
          <svg:line [attr.x1]="legendMargin" y1="0" [attr.x2]="legendMargin" [attr.y2]="height-legendMargin" [attr.stroke-width]="axisStrokeWidth" [attr.stroke]="axisColor"></svg:line>
          <svg:line [attr.x1]="legendMargin" [attr.y1]="height-legendMargin" [attr.x2]="width" [attr.y2]="height-legendMargin" [attr.stroke-width]="axisStrokeWidth" [attr.stroke]="axisColor"></svg:line>
          <svg:rect *ngFor="let stat of stats; index as i" [attr.x]="legendMargin + i * (barWidth + spaceBetweenBars)" [attr.y]="getYStart(stat)" [attr.height]="getHeight(stat)" [attr.width]="barWidth" />
          <svg:text *ngFor="let stat of stats; index as i" [attr.x]="legendMargin + i * (barWidth + spaceBetweenBars)" [attr.y]="height-legendMargin+10" [attr.transform]="getXLegendRotation(stat, i)">{{stat.label}}</svg:text>
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
  private rightGraphMargin = 50;
  private width = 400 + this.rightGraphMargin;
  private height = 400;
  private legendMargin = 100;
  private graphWidth = this.width - this.legendMargin - this.rightGraphMargin;
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

  private initBarChart(stats: Istat[]) {
    this.stats = stats;
    this.barWidth = this.graphWidth / (this.stats.length + this.stats.length / this.barToSpaceRatio);
    this.spaceBetweenBars = this.barWidth / this.barToSpaceRatio;
    const max = _.maxBy(this.stats, point => point.value);
    this.verticalBarScale = this.graphHeight / max.value;
  }

  private getHeight(point: Istat): number {
    return point.value * this.verticalBarScale;
  }

  private getYStart(point: Istat): number {
    return this.height - point.value * this.verticalBarScale - this.legendMargin;
  }

  private getXLegendRotation(stat: Istat, i: number) {
    return `rotate(30 ${this.legendMargin + i * (this.barWidth + this.spaceBetweenBars)} ${this.height - this.legendMargin/2})`;
  }
}
