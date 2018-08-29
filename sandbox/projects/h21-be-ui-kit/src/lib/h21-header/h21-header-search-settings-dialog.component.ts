import {Component} from "@angular/core";
import {MatDialogRef} from '@angular/material';

@Component({
	selector: 'h21-header-search-settings-dialog',
	templateUrl: './h21-header-search-settings-dialog.component.html'
})

export class H21HeaderSearchSettingsDialogComponent {
	constructor(public dialogRef: MatDialogRef<H21HeaderSearchSettingsDialogComponent>) {

	}
}
