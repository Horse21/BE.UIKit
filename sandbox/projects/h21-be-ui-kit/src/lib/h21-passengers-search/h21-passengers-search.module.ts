import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSnackBarModule,
} from '@angular/material';
import {H21PassengersSearchComponent} from "./h21-passengers-search.component"
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatCardModule,
		MatSnackBarModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [H21PassengersSearchComponent],
	exports: [H21PassengersSearchComponent]
})
export class H21PassengersSearchModule {

}
