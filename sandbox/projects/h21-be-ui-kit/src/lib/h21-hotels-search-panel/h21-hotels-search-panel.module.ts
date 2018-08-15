import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21HotelsSearchPanelComponent} from "./h21-hotels-search-panel.component";
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule,
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
	declarations: [H21HotelsSearchPanelComponent],
	exports: [H21HotelsSearchPanelComponent]
})
export class H21HotelsSearchPanelModule {

}
