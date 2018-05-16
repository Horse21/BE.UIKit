import {Component, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {DocsComponent} from "./docs/docs.component";
import {DocsNavigationComponent} from "./docs-navigation/docs-navigation.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry],
})

export class AppComponent {
	@ViewChild(DocsNavigationComponent) private docsNavigation: DocsNavigationComponent;
	@ViewChild(DocsComponent) private docs: DocsComponent;

	constructor(iconReg: MatIconRegistry, sanitizer: DomSanitizer, public router: Router) {
		iconReg.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/img/horse21-logo.svg'));
		iconReg.addSvgIcon(
			'h21_flight_land_blue',
			sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-blue-icon.svg')
		);
		iconReg.addSvgIcon(
			'h21_flight_land_green',
			sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-green-icon.svg')
		);
		iconReg.addSvgIcon('h21_flight_land_red', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-red-icon.svg'));
		iconReg.addSvgIcon(
			'h21_flight_takeoff_blue',
			sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-blue-icon.svg')
		);
		iconReg.addSvgIcon(
			'h21_flight_takeoff_green',
			sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-green-icon.svg')
		);
		iconReg.addSvgIcon(
			'h21_flight_takeoff_red',
			sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-red-icon.svg')
		);
	}

	ngOnInit() {
		if (this.docsNavigation) {
			this.subscription = this.docsNavigation.getEmitter()
				.subscribe(item => this.docs.changeComponent(item));
		}
	}

	title = 'Horse 21 Pro';
	subscription: any;

	isDemo(): boolean {
		return this.router.url.indexOf('/demo') == 0;
	}

	changeComponent(event): void {
		this.docs.changeComponent(event);
	}
}
