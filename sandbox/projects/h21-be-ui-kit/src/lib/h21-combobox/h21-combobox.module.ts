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
import {H21ComboboxComponent} from "./h21-combobox.component"
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
	declarations: [H21ComboboxComponent],
	exports: [H21ComboboxComponent],
})

export class H21ComboboxModule {

}
