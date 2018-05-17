import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {H21HeaderUserSelectorDialogComponent} from "../../../../../src/app/header-dialog/h21-header-user-selector-dialog.component";

@Component({
	selector: 'h21-header',
	templateUrl: './h21-header.component.html'
})

export class H21HeaderComponent {
	constructor(public dialog: MatDialog) {

	}
	openDialog(): void {
		this.dialog.open(H21HeaderUserSelectorDialogComponent, {
			width: '600px'
		});
	}
}
