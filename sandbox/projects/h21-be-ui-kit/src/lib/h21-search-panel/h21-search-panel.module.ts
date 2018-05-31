import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SearchPanelComponent} from "./h21-search-panel.component";
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule, MatDatepickerModule,
	MatDividerModule, MatFormFieldModule,
	MatIconModule, MatMenuModule, MatOptionModule, MatSelectModule
} from "@angular/material";
import {H21FlyRouteSelectionComponent} from "./h21-fly-route-selection.component";
import {H21PassangersSelectComponent} from "./h21-passangers-select.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {H21RightOverlayPanelComponent} from "../h21-right-overlay-panel/h21-right-overlay-panel.component"

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
		MatMenuModule
	],
	declarations: [H21SearchPanelComponent, H21FlyRouteSelectionComponent, H21PassangersSelectComponent, H21RightOverlayPanelComponent],
	exports: [H21SearchPanelComponent]
})
export class H21SearchPanelModule {

}
