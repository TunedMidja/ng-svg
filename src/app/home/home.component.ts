import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <p>This website shows some sample interactive SVG widgets using Angular.io</p>
  <p>Click on the links below to explore the samples</p>
    <h2>SVG Samples:</h2>
    <nav>
      <p><a routerLink='/stats' routerLinkActive="active">Stats Component</a></p>
      <p><a routerLink='/beam' routerLinkActive="active">Beam Component</a></p>
      <p><a routerLink='/section' routerLinkActive="active">Section Component</a></p>
      <p><a routerLink='/bar-chart' routerLinkActive="active">Bar Chart Component</a></p>
    </nav>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
