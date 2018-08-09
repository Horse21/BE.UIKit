import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {H21HeaderUserSelectorDialogComponent} from "./h21-header-user-selector-dialog.component";
import {INotifyItem} from '../../dto/inotifyItem';
import {H21HeaderSearchSettingsDialogComponent} from "./h21-header-search-settings-dialog.component";

@Component({
	selector: 'h21-header',
	templateUrl: './h21-header.component.html'
})

export class H21HeaderComponent {

	@Input() showSearch = false;
	@Input() showServicesMenuBtn = true;

	@Input() username;
	@Input() logotypeUrl;
	@Input() isPrototype = false;
	@Input() showNotifications = true;
	@Input() notifyList: INotifyItem[];
	@Output() onPrototypeAuth: EventEmitter<any> = new EventEmitter();
	@Output() onLogout: EventEmitter<any> = new EventEmitter();

	constructor(public dialog: MatDialog) {
	}

	openDialog(): void {
		var dialogRef = this.dialog.open(H21HeaderUserSelectorDialogComponent, {
			width: '600px'
		});
		dialogRef.afterClosed()
			.subscribe(result => {
				if (this.onPrototypeAuth) {
					this.onPrototypeAuth.emit(result);
				}
			});
	}

	logout(): void {
		this.onLogout.emit();
	}

	openSearchSettingsDialog(): void {
		var dialogRef = this.dialog.open(H21HeaderSearchSettingsDialogComponent, {
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {

			// Here, the processing of the dialog data returned

		});
	}
}
