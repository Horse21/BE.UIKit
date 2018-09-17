import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatIconModule,
	MatTabsModule,
	MatTooltipModule,
} from "@angular/material";
import {H21SlideCarouselModule} from "./../h21-slide-carousel/h21-slide-carousel.module";
import {H21HotelRoomDetailModule} from "./../h21-hotel-room-detail/h21-hotel-room-detail.module";
import {H21HotelBookComponent} from "./h21-hotel-book.component";
import {H21RateModule} from "./../h21-rate/h21-rate.module";
import {
	DxDataGridModule,
	DxTemplateModule
} from "devextreme-angular";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatTabsModule,
		MatTooltipModule,
		DxDataGridModule,
		DxTemplateModule,
		H21SlideCarouselModule,
		H21HotelRoomDetailModule,
		H21RateModule,
	],
	declarations: [H21HotelBookComponent],
	exports: [H21HotelBookComponent]
})
export class H21HotelBookModule {

}
