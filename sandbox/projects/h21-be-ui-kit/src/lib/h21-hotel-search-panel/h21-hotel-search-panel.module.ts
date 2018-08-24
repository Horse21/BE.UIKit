import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21HotelSearchPanelComponent} from "./h21-hotel-search-panel.component";
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule,
	MatDividerModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatOptionModule,
	MatSelectModule
} from "@angular/material";
import {
	FormsModule,
	ReactiveFormsModule
} from "@angular/forms";
import {H21RightOverlayPanelModule} from "../h21-right-overlay-panel/h21-right-overlay-panel.module";
import {H21TwoMonthCalendarModule} from "../h21-two-month-calendar/h21-two-month-calendar.module";
import {H21CounterModule} from "../h21-counter/h21-counter.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatButtonToggleModule,
		MatDividerModule,
		MatCheckboxModule,
		MatOptionModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		FormsModule,
		ReactiveFormsModule,
		MatSelectModule,
		H21RightOverlayPanelModule,
		H21TwoMonthCalendarModule,
		MatInputModule,
		H21CounterModule
	],
	declarations: [H21HotelSearchPanelComponent],
	exports: [H21HotelSearchPanelComponent]
})
export class H21HotelSearchPanelModule {

}
