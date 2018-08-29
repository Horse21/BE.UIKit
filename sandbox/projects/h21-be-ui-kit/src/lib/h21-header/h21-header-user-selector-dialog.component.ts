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
				<mat-checkbox color="primary" [checked]="hasAirBE" (change)="hasAirBE = !hasAirBE">AirBE</mat-checkbox>
				<mat-checkbox color="primary" [checked]="isAgent" (change)="isAgent = !isAgent">Agent</mat-checkbox>
				<mat-checkbox color="primary" [checked]="isAgencyManager" (change)="isAgencyManager = !isAgencyManager">
					AgencyManager
				</mat-checkbox>
				<mat-checkbox color="primary" [checked]="isBranchManager" (change)="isBranchManager = !isBranchManager">
					BranchManager
				</mat-checkbox>
			</div>
			<div class="col-sm-12">
				<mat-divider class="modal-form-dividier"></mat-divider>
			</div>
			<div class="col-sm-12 modal-form-buttons-to-right">
				<button mat-raised-button color="accent" (click)="auth()">Auth</button>
				<button mat-raised-button color="primary" (click)="closeDialog()">Cancel</button>
			</div>
		</div>`
})

export class H21HeaderUserSelectorDialogComponent {
	constructor(public dialogRef: MatDialogRef<H21HeaderUserSelectorDialogComponent>) {
	}

	hasAirBE: boolean = true;
	isAgent: boolean = true;
	isAgencyManager: boolean = true;
	isBranchManager: boolean = true;
	userName = new FormControl('Ivan Ivanov', [Validators.required]);

	getErrorMessage() {
		return this.userName.hasError('required') ? 'You must enter a value' : '';
	}

	closeDialog() {
		this.dialogRef.close();
	}

	auth() {
		if (!this.userName.value) {
			return;
		}
		var authData: any = {
			name: this.userName.value,
			roles: [],
			claims: []
		};
		if (this.hasAirBE) {
			authData.roles.push('AirBE');
		}
		if (this.isAgent) {
			authData.claims.push({
				name: 'AgentId',
				value: 2100
			});
		}
		if (this.isAgencyManager) {
			authData.claims.push({
				name: 'AgencyManager',
				value: 2200
			});
		}
		if (this.isBranchManager) {
			authData.claims.push({
				name: 'BranchManager',
				value: 2300
			});
		}

		this.dialogRef.close(authData);
	}
}

