import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDividerModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule
} from "@angular/material";
import {NouisliderModule} from "ng2-nouislider";
import {H21RateModule} from "./../h21-rate/h21-rate.module";
import {H21HotelFilterPanelComponent} from "./h21-hotel-filter-panel.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		MatExpansionModule,
		MatCheckboxModule,
		NouisliderModule,
		MatButtonModule,
		H21RateModule,
		MatButtonToggleModule,
		MatDividerModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		MatChipsModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule
	],
	declarations: [H21HotelFilterPanelComponent],
	exports: [H21HotelFilterPanelComponent]
})
export class H21HotelFilterPanelModule {

}
