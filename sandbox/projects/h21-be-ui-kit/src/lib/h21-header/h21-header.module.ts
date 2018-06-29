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
	MatDividerModule,
	MatCardModule,
	MatListModule} from "@angular/material";
import {H21HeaderComponent} from "./h21-header.component";
import {H21HeaderUserSelectorDialogComponent} from "./h21-header-user-selector-dialog.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {H21UserCardComponent} from "../h21-user-card/h21-user-card.component";

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
		MatDividerModule,
		MatCardModule,
		MatListModule
	],
	declarations: [
		H21HeaderComponent,
		H21HeaderUserSelectorDialogComponent,
		H21UserCardComponent
	],
	exports: [H21HeaderComponent],
	entryComponents: [H21HeaderUserSelectorDialogComponent]
})
export class H21HeaderModule {
}
