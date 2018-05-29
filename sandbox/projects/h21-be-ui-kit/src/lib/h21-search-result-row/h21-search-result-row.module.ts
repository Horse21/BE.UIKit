import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule, MatDividerModule, MatIconModule
} from "@angular/material";
import {H21SearchResultRowComponent} from './h21-search-result-row.component';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule
	],
	declarations: [H21SearchResultRowComponent],
	exports: [H21SearchResultRowComponent]
})
export class H21SearchResultRowModule {
}
