import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DimensionComponent } from '../dimension/dimension.component'
import { Idim } from 'app/interfaces';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-section',
  template: `
  <h2>{{title}}</h2>
  <div class="calc">
    <div>
      <form #f="ngForm">
        <div><label>h</label><input type="number" name="h" [(ngModel)]="h"></div>
        <div><label>b</label><input type="number" name="b" [(ngModel)]="b"></div>
        <div><label>tf</label><input type="number" name="tf" [(ngModel)]="tf"></div>
        <div><label>tw</label><input type="number" name="tw" [(ngModel)]="tw"></div>
      </form>
      <p>Moment of Intertia: {{ I | number : '1.1-1' }}</p>
      <p>Area: {{ A | number : '1.1-1' }}</p>
      <p>Elastic Modulus: {{ S | number : '1.1-1' }}</p>
    </div>
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <svg:path [attr.d]="pathIshape(x1,y1,h,b,tw,tf)" fill="transparent" stroke="black"/>
      <svg:g app-dimension *ngFor="let d of dims" [dim]="d" />
    </svg>
  </div>
  `,
  styles: [`
    .calc {
      display:flex;
      flex-direction: row;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    form label {
      margin-right: 8px;
    }
  `]
})
export class SectionComponent implements OnInit, AfterViewInit {
  @ViewChild('f') form;
  title = 'Standard steel shapes with dimension labels';
  x1 = 10
  y1 = 50
  h = 200
  b = 100
  tw = 6
  tf = 15
  I: number
  A: number
  S: number
  path: string
  dims: Idim[]

  constructor() { }

  ngOnInit() {
    this.path = this.pathIshape(this.x1, this.y1, this.h, this.b, this.tw, this.tf);
    this.doCalcs();
  }

  ngAfterViewInit() {
    console.log(this.form);
    this.form.control.valueChanges.debounceTime(500).subscribe(value => this.doCalcs())
  }

  doCalcs() {
    this.calculateProperties();
    this.calculateDims();
  }

  calculateProperties() {
      this.I = this.IshapeI(this.h, this.b, this.tw, this.tf);
      this.A = this.IshapeA(this.h, this.b, this.tw, this.tf);
      this.S = this.IshapeS(this.h, this.b, this.tw, this.tf);
    }

  calculateDims() {
    this.dims = [
      {p1: [this.x1 + this.b, this.y1], p2: [this.x1 + this.b, this.y1 + this.h], label: 'h'},
      {p1: [this.x1, this.y1], p2: [this.x1 + this.b, this.y1], label: 'b'}
    ]
  }

  // addDimension adds a linear dimension with label from pt (x1,y1) to (x2,y2)
  addDimension(x1: number, y1: number, x2: number, y2: number, label: string) {
    // search for existing dim at same coords, update label if found

    // else add a new dimension
    this.dims.push({p1: [x1, y1], p2: [x2, y2], label: label})
    // send some cmd to DimensionComponent to update
  }

  pathIshape(x1, y1, h, b, tw, tf): string {
    // construct the string for svg path command
    let a = (b - tw) / 2;
    let hi = h - 2 * tf;
    let s = ' ';
    let str = 'M '  + x1 + s + y1 + ' h ' + b + ' v ' + tf + ' h ' + (-1 * a) + ' v ' + hi + ' h ' + a + ' v ' + tf +
    ' h '+ (-b)+ ' v '+(-tf)+' h ' + a + ' v ' + (-hi) + ' h ' + (-a) +         ' z';
    return str
  }

  pathLabel(x1: number, y1: number, x2: number, y2: number, standoff = 10, overrun = 5): string {
    let str = ''
    let a = Math.atan((y2-y1)/(x2-x1));

    return str
   }

   rotateCoord(x: number, y: number , a: number) {
    return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]
   }

   IshapeI(h, b, tw, tf) {
     return 1/12*(b*h*h*h-(b-tw)*(h-2*tf)*(h-2*tf)*(h-2*tf))
   }
   IshapeA(d,b,w,t) {
     return 2*b*d + (d - 2*t)*w
   }
   IshapeS(d,b,w,t) {
     return 1/6/d*(b*d*d*d-(b-w)*(d-2*t)*(d-2*t)*(d-2*t))
   }

}
