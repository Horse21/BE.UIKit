import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
	MatSelectModule, MatButtonToggleModule, MatDividerModule
} from "@angular/material";
import {H21TopToolbarComponent} from "./h21-top-toolbar.component";
import {H21BreadcrumbsModule} from "../h21-breadcrumbs/h21-breadcrumbs.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatSelectModule,
		MatButtonToggleModule,
		MatDividerModule,
		FormsModule,
		H21BreadcrumbsModule,
	],
	declarations: [
		H21TopToolbarComponent,
	],
	exports: [H21TopToolbarComponent]
})
export class H21TopToolbarModule {

}
