import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material";
import { H21RateComponent } from "./h21-rate.component"

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
	],
	declarations: [H21RateComponent],
	exports: [H21RateComponent],
})

export class H21RateModule {

}
