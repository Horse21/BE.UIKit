import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatDialog} from '@angular/material';
import {H21HeaderUserSelectorDialogComponent} from "./h21-header-user-selector-dialog.component";
import {INotifyItem} from '../../dto/inotifyItem';

@Component({
	selector: 'h21-header',
	templateUrl: './h21-header.component.html'
})

export class H21HeaderComponent {
	constructor(public dialog: MatDialog) {

	}

	@Input() username;
	@Input() logotypeUrl;
	@Input() isPrototype = false;
	@Input() showNotifications = true;
	@Input() notifyList: INotifyItem[]
	@Output() onPrototypeAuth: EventEmitter<any> = new EventEmitter();
	@Output() onLogout: EventEmitter<any> = new EventEmitter();

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
}
