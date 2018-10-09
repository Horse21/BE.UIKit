import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {H21HeaderUserSelectorDialogComponent} from "./h21-header-user-selector-dialog.component";
import {H21HeaderSearchSettingsDialogComponent} from "./h21-header-search-settings-dialog.component";
import {INotifyItem} from '../../dto/inotifyItem';
import {IUserCardData} from "../../dto/i-user-card-data";


@Component({
	selector: 'h21-header',
	templateUrl: './h21-header.component.html'
})

export class H21HeaderComponent {

	@Input() logotypeUrl: string;
	@Input() title: string;
	@Input() showSearch: boolean = false;
	@Input() showServicesMenuBtn: boolean = true;
	@Input() showNotifications: boolean = true;
	@Input() isPrototype = false;
	@Input() notifyList: INotifyItem[];
	@Input() userName: string;
	@Input() userCardData: IUserCardData;

	@Output() onPrototypeAuth: EventEmitter<any> = new EventEmitter();
	@Output() onUserCardAction: EventEmitter<string> = new EventEmitter();
	@Output() onLogout: EventEmitter<any> = new EventEmitter();

	constructor(public dialog: MatDialog) {
	}

	userCardAction(actionName: string): void {
		this.onUserCardAction.emit(actionName);
	}

	logout(): void {
		this.onLogout.emit();
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

	openSearchSettingsDialog(): void {
		var dialogRef = this.dialog.open(H21HeaderSearchSettingsDialogComponent, {
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {

			// Here, the processing of the dialog data returned

		});
	}
}
