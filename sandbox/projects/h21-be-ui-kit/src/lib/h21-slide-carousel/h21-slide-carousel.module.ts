import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SlideCarouselComponent} from "./h21-slide-carousel.component";
import {
	MatButtonModule,
	MatIconModule,
} from "@angular/material";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
	],
	declarations: [
		H21SlideCarouselComponent,
	],
	exports: [H21SlideCarouselComponent]
})

export class H21SlideCarouselModule {

}
