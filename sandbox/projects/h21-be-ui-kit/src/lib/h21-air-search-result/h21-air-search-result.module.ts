import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule, MatIconModule, MatProgressBarModule, MatSelectModule, MatTabsModule
} from "@angular/material";
import {H21AirSearchResultComponent} from './h21-air-search-result.component';
import {H21AirSearchResultCardModule} from "../h21-air-search-result-card/h21-air-search-result-card.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatTabsModule,
		H21AirSearchResultCardModule,
		MatSelectModule,
		MatProgressBarModule
	],
	declarations: [H21AirSearchResultComponent],
	exports: [H21AirSearchResultComponent]
})
export class H21AirSearchResultModule {
}
