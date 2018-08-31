import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatFormFieldModule,
	MatIconModule,
	MatOptionModule,
	MatProgressBarModule,
	MatSelectModule,
	MatTabsModule
} from "@angular/material";
import {H21HotelSearchResultComponent} from "./h21-hotel-search-result.component";
import {H21HotelSearchResultCardModule} from "./../h21-hotel-search-result-card/h21-hotel-search-result-card.module";

@NgModule({
	imports: [
		CommonModule,
		MatTabsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatOptionModule,
		MatIconModule,
		MatProgressBarModule,
		H21HotelSearchResultCardModule
	],
	declarations: [H21HotelSearchResultComponent],
	exports: [H21HotelSearchResultComponent]
})

export class H21HotelSearchResultModule {

}
