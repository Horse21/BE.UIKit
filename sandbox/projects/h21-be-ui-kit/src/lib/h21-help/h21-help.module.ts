import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule
} from '@angular/material';
import {H21HelpComponent} from "./h21-help.component"

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatFormFieldModule,
		MatExpansionModule,
		MatInputModule
	],
	declarations: [H21HelpComponent],
	exports: [H21HelpComponent]
})
export class H21HelpModule {

}
