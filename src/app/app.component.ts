import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>
    <a routerLink='/'>{{title}}</a>
  </h1>
  <nav>
    <a routerLink='/stats' routerLinkActive="active">Stats Component</a>
    <a routerLink='/beam' routerLinkActive="active">Beam Component</a>
    <a routerLink='/section' routerLinkActive="active">Section Component</a>
    <a routerLink='/bar-chart' routerLinkActive="active">Bar Chart Component</a>
  </nav>

  <router-outlet></router-outlet>
  `,
  styles: [`

    `
  ],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'SVG Playground'
  constructor() {
   }

  ngOnInit() {

  }
}
