import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SearchPanelComponent} from "./h21-search-panel.component";
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule, MatDatepickerModule,
	MatDividerModule, MatFormFieldModule,
	MatIconModule, MatOptionModule, MatSelectModule
} from "@angular/material";
import {FlyRouteSelectionComponent} from "./fly-route-selection.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
		MatSelectModule
	],
	declarations: [H21SearchPanelComponent, FlyRouteSelectionComponent],
	exports: [H21SearchPanelComponent]
})
export class H21SearchPanelModule {

}
