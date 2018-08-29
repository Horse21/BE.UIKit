import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21HotelSearchResultComponent} from "./h21-hotel-search-result.component";
import {
	MatFormFieldModule,
	MatIconModule,
	MatOptionModule,
	MatProgressBarModule,
	MatSelectModule,
	MatTabsModule
} from "@angular/material";

@NgModule({
	imports: [
		CommonModule,
		MatTabsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatOptionModule,
		MatIconModule,
		MatProgressBarModule,
	],
	declarations: [H21HotelSearchResultComponent],
	exports: [H21HotelSearchResultComponent]
})

export class H21HotelSearchResultModule {

}
