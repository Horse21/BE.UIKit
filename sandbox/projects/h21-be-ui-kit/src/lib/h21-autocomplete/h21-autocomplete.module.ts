import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatTooltipModule,
} from '@angular/material';
import {H21AutocompleteComponent} from './h21-autocomplete.component';
import {
	FormsModule,
	ReactiveFormsModule
} from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatMenuModule,
		MatListModule,
		MatTooltipModule,
	],
	declarations: [H21AutocompleteComponent],
	exports: [H21AutocompleteComponent],
})

export class H21AutocompleteModule {

}
