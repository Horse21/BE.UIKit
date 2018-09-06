import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatIconModule,
} from "@angular/material";
import {H21HotelRoomDetailComponent} from "./h21-hotel-room-detail.component";

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
	],
	declarations: [H21HotelRoomDetailComponent],
	exports: [H21HotelRoomDetailComponent]
})
export class H21HotelRoomDetailModule {

}
