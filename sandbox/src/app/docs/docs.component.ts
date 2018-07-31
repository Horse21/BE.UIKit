import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'docs',
  templateUrl: './docs.component.html'
})

export class DocsComponent {
  constructor(location: Location) {
    this.location = location;
    this.routeLink = location.path();
  }

  location: Location;
  pagePath = '';
  routeLink = '';

  changeComponent(link:string): void {
    this.routeLink = link;
    this.location.replaceState(link);
  }
}
