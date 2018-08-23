import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from "@angular/platform-browser";

import 'prismjs/prism';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

declare var Prism;

@Component({
	selector: 'icon-example-dialog',
	templateUrl: './icon-example-dialog.component.html'
})

export class IconExampleDialogComponent {
	title: String;
	iconName: String;
	confSize: String = '';
	confColor: String = '';
	isCustomIcon: boolean = false;
	includeInButton: boolean = false;
	confCodeSample: String = '';

	constructor(public dialogRef: MatDialogRef<IconExampleDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any,
				iconReg: MatIconRegistry,
				sanitizer: DomSanitizer) {

		this.iconName = data.iconName;
		this.isCustomIcon = data.isCustomIcon;

		iconReg.addSvgIcon('h21_flight_land_blue', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-blue-icon.svg'));
		iconReg.addSvgIcon('h21_flight_land_green', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-green-icon.svg'));
		iconReg.addSvgIcon('h21_flight_land_red', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-red-icon.svg'));
		iconReg.addSvgIcon('h21_flight_takeoff_blue', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-blue-icon.svg'));
		iconReg.addSvgIcon('h21_flight_takeoff_green', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-green-icon.svg'));
		iconReg.addSvgIcon('h21_flight_takeoff_red', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-red-icon.svg'));

		iconReg.addSvgIcon('h21_baggage', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-baggage-blue.svg'));
		iconReg.addSvgIcon('h21_no_baggage', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-no-baggage-gray.svg'));
		iconReg.addSvgIcon('h21_luggage', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-luggage-blue.svg'));
		iconReg.addSvgIcon('h21_no_luggage', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-no-luggage-gray.svg'));
		iconReg.addSvgIcon('h21_night', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-night-blue.svg'));
		iconReg.addSvgIcon('h21_back_to_list', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-back-to-list-gray.svg'));
	}

	ngOnInit() {
		this.updateCodeSample();
	}

	updateCodeSample() {
		this.confCodeSample = this.highlightCode(this.getCodeSample());
	}

	getCodeSample(): String {
		let code = this.includeInButton ?
			`<button mat-icon-button${this.confColor && !this.isCustomIcon ? ` color="${this.confColor}"` : ''}${this.confSize ? ` class="${this.confSize}"` : ''}>\n    <mat-icon${this.isCustomIcon ? ` svgIcon="${this.iconName}"` : ''}>${!this.isCustomIcon ? this.iconName : ''}</mat-icon>\n</button>` :
			`<mat-icon${this.confColor && !this.isCustomIcon ? ` color="${this.confColor}"` : ''}${this.confSize ? ` class="${this.confSize}"` : ''}${this.isCustomIcon ? ` svgIcon="${this.iconName}"` : ''}>${!this.isCustomIcon ? this.iconName : ''}</mat-icon>`;
		return code;
	}

	highlightCode(code: String): String {
		return Prism.highlight(code, Prism.languages.html);
	}

	close() {
		this.dialogRef.close();
	}
}

