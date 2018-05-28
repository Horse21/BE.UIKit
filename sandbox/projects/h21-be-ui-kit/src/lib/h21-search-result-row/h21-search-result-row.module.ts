import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule, MatDividerModule
} from "@angular/material";
import {H21SearchResultRowComponent} from './h21-search-result-row.component';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatButtonModule,
		MatDividerModule,
	],
	declarations: [H21SearchResultRowComponent],
	exports: [H21SearchResultRowComponent]
})
export class H21SearchResultRowModule {
}
