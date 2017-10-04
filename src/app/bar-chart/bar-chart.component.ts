import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  template: `
    <div>
      <svg [attr.width]="width" [attr.height]="height">
        <svg:g>
          <svg:line [attr.x1]="legendMargin" y1="0" [attr.x2]="legendMargin" [attr.y2]="width-legendMargin" [attr.stroke-width]="axisStrokeWidth" [attr.stroke]="axisColor"></svg:line>
          <svg:line [attr.x1]="legendMargin" [attr.y1]="height-legendMargin" [attr.x2]="width" [attr.y2]="width-legendMargin" [attr.stroke-width]="axisStrokeWidth" [attr.stroke]="axisColor"></svg:line>
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

  constructor() { }

  ngOnInit() {
  }
}
