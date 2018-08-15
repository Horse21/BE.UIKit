import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule,
	MatChipsModule,
	MatExpansionModule,
	MatFormFieldModule, MatIconModule
} from "@angular/material";
import {NouisliderModule} from "ng2-nouislider";
import {H21RateModule} from "../h21-rate/h21-rate.module";
import {H21HotelsFilterPanelComponent} from "./h21-hotels-filter-panel.component";
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
		MatFormFieldModule,
		MatAutocompleteModule,
		MatChipsModule,
		MatIconModule,
	],
	declarations: [H21HotelsFilterPanelComponent],
	exports: [H21HotelsFilterPanelComponent]
})
export class H21HotelsFilterPanelModule {

}
