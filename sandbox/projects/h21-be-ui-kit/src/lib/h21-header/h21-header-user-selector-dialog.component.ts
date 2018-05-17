import {Component} from "@angular/core";
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'h21-header-user-selector-dialog',
	template: `
<div class="row mat-typography">
	<div class="col-sm-12 modal-form-alone-text-filed">
		<mat-form-field color="primary">
			<input matInput placeholder="User name" [formControl]="userName" required>
			<mat-error *ngIf="userName.invalid">{{getErrorMessage()}}</mat-error>
		</mat-form-field>
	</div>
	<div class="col-sm-12 modal-form-vertical-checkboxes">
		<mat-checkbox color="primary" [checked]="">Administrator</mat-checkbox>
		<mat-checkbox color="primary" [checked]="">Moderator</mat-checkbox>
		<mat-checkbox color="primary" [checked]="">Unknown user</mat-checkbox>
	</div>
	<div class="col-sm-12">
		<mat-divider class="modal-form-dividier"></mat-divider>
	</div>
	<div class="col-sm-12 modal-form-buttons-to-right">
		<button mat-raised-button color="accent" (click)="closeDialog()">Acсept</button>
		<button mat-raised-button color="primary" (click)="closeDialog()">Cancel</button>
	</div>
</div>`
})

export class H21HeaderUserSelectorDialogComponent {
	constructor(public dialogRef: MatDialogRef<H21HeaderUserSelectorDialogComponent>) {
	}
	onNoClick(): void {
		this.dialogRef.close();
	}

	userName = new FormControl('', [Validators.required]);
	getErrorMessage() {
		return this.userName.hasError('required') ? 'You must enter a value' : '';
	}

	closeDialog() {
		this.dialogRef.close();
	}
}

