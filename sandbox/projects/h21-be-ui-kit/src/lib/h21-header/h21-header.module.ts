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
	MatListModule,
	MatSelectModule,
	MatDatepickerModule
} from "@angular/material";
import {H21UserCardModule} from "../h21-user-card/h21-user-card.module";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {H21HeaderComponent} from "./h21-header.component";
import {H21HeaderUserSelectorDialogComponent} from "./h21-header-user-selector-dialog.component";
import {H21HeaderSearchSettingsDialogComponent} from "./h21-header-search-settings-dialog.component";


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
		H21UserCardModule
	],
	declarations: [
		H21HeaderComponent,
		H21HeaderUserSelectorDialogComponent,
		H21HeaderSearchSettingsDialogComponent,
	],
	exports: [H21HeaderComponent],
	entryComponents: [H21HeaderUserSelectorDialogComponent, H21HeaderSearchSettingsDialogComponent]
})
export class H21HeaderModule {
}
