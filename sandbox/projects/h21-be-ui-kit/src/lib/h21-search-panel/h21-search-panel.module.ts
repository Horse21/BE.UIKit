import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SearchPanelComponent} from "./h21-search-panel.component";
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule, MatDatepickerModule,
	MatDividerModule, MatFormFieldModule,
	MatIconModule, MatInputModule, MatMenuModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {H21RightOverlayPanelModule} from "../h21-right-overlay-panel/h21-right-overlay-panel.module"
import {H21FlyRouteSelectionComponent} from "./h21-fly-route-selection.component";
import {H21PassengersSelectComponent} from "./h21-passengers-select.component";
import {H21TwoMonthCalendarModule} from "../h21-two-month-calendar/h21-two-month-calendar.module";

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
		MatDatepickerModule,
		FormsModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatMenuModule,
		H21RightOverlayPanelModule,
		H21TwoMonthCalendarModule,
		MatInputModule
	],
	declarations: [
		H21SearchPanelComponent,
		H21FlyRouteSelectionComponent,
		H21PassengersSelectComponent
	],
	exports: [H21SearchPanelComponent]
})
export class H21SearchPanelModule {

}
