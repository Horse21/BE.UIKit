import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
} from '@angular/material';
import {H21ComboboxComponent} from "./h21-combobox.component"

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		H21ComboboxComponent,
		MatMenuModule,
	],
	declarations: [H21ComboboxComponent],
	exports: [H21ComboboxComponent],
})

export class H21ComboboxModule {

}
