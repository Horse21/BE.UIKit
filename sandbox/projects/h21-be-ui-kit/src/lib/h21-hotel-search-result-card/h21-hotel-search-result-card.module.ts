import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatIconModule,
} from "@angular/material";
import {H21RateModule} from "./../h21-rate/h21-rate.module";
import {H21HotelSearchResultCardComponent} from "./h21-hotel-search-result-card.component";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		H21RateModule,
	],
	declarations: [H21HotelSearchResultCardComponent],
	exports: [H21HotelSearchResultCardComponent]
})
export class H21HotelSearchResultCardModule {

}
