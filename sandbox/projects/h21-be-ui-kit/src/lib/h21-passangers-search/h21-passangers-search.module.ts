import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatIconModule,
	MatListModule
} from "@angular/material";
import {H21PassangersSearchComponent} from "./h21-passangers-search.component"

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatListModule,
		MatCardModule
	],
	declarations: [H21PassangersSearchComponent],
	exports: [H21PassangersSearchComponent]
})
export class H21PassangersSearchModule {

}
