import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule,
	MatDividerModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatOptionModule,
	MatSelectModule
} from '@angular/material';
import {H21HotelReservationComponent} from "./h21-hotel-reservation.component"
import {H21RateModule} from "../h21-rate/h21-rate.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatButtonToggleModule,
		MatDividerModule,
		MatFormFieldModule,
		MatInputModule,
		H21RateModule,
		MatCheckboxModule,
		MatSelectModule,
		MatOptionModule
	],
	declarations: [H21HotelReservationComponent],
	exports: [H21HotelReservationComponent]
})

export class H21HotelReservationModule {

}
