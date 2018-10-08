import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
	MatSelectModule, MatButtonToggleModule, MatDividerModule, MatTooltipModule, MatOptionModule
} from "@angular/material";
import {H21TopToolbarComponent} from "./h21-top-toolbar.component";
import {H21BreadcrumbsModule} from "../h21-breadcrumbs/h21-breadcrumbs.module";
import {H21CartComboboxModule} from "../h21-cart-combobox/h21-cart-combobox.module";
import {H21TopToolbarButtonContainerComponent} from "./h21-top-toolbar-button-container/h21-top-toolbar-button-container.component";
import {H21TopToolbarButtonComponent} from "./h21-top-toolbar-button/h21-top-toolbar-button.component";
import {H21ComboboxModule} from "../h21-combobox/h21-combobox.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatSelectModule,
		MatOptionModule,
		MatButtonToggleModule,
		MatDividerModule,
		MatTooltipModule,
		FormsModule,
		H21BreadcrumbsModule,
		H21CartComboboxModule,
		H21ComboboxModule,
	],
	declarations: [
		H21TopToolbarComponent,
		H21TopToolbarButtonContainerComponent,
		H21TopToolbarButtonComponent
	],
	exports: [
		H21TopToolbarComponent,
		H21TopToolbarButtonContainerComponent,
		H21TopToolbarButtonComponent
	]
})

export class H21TopToolbarModule {

}
