import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatBadgeModule,
	MatButtonModule,
	MatIconModule,
	MatMenuModule,
	MatToolbarModule,
	MatInputModule,
	MatFormFieldModule,
	MatCheckboxModule,
	MatDividerModule} from "@angular/material";
import {H21HeaderComponent} from "./h21-header.component";
import {H21HeaderUserSelectorDialogComponent} from "./h21-header-user-selector-dialog.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatToolbarModule,
		MatBadgeModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatDividerModule
	],
	declarations: [
		H21HeaderComponent,
		H21HeaderUserSelectorDialogComponent
	],
	exports: [H21HeaderComponent]
})
export class H21HeaderModule {
}
