import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
	MatSelectModule} from "@angular/material";
import {H21TopToolbarComponent} from "./h21-top-toolbar.component";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatSelectModule,
	],
	declarations: [
		H21TopToolbarComponent,
	],
	exports: [H21TopToolbarComponent]
})
export class H21TopToolbarModule {
}
