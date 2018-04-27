import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry]
})
export class AppComponent {

  constructor(iconReg: MatIconRegistry, sanitizer: DomSanitizer, location: Location, router: Router) {
    this.location = location;
    iconReg.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/img/horse21-logo.svg'));
  }

  location: Location;
  title = 'app';
  routeLink = '';

  changeComponent(link:string): void {
    this.routeLink = link;
    this.location.replaceState(link);
  }
}
