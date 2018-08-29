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
	MatListModule, MatSelectModule, MatDatepicker, MatDatepickerModule
} from "@angular/material";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {H21HeaderComponent} from "./h21-header.component";
import {H21HeaderUserSelectorDialogComponent} from "./h21-header-user-selector-dialog.component";
import {H21HeaderSearchSettingsDialogComponent} from "./h21-header-search-settings-dialog.component";
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
		MatListModule,
		MatSelectModule,
		MatDatepickerModule,
	],
	declarations: [
		H21HeaderComponent,
		H21HeaderUserSelectorDialogComponent,
		H21HeaderSearchSettingsDialogComponent,
		H21UserCardComponent
	],
	exports: [H21HeaderComponent],
	entryComponents: [H21HeaderUserSelectorDialogComponent, H21HeaderSearchSettingsDialogComponent]
})
export class H21HeaderModule {
}
