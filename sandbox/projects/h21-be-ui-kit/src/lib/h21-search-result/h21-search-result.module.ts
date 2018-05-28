import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule, MatIconModule, MatTabsModule
} from "@angular/material";
import {H21SearchResultComponent} from './h21-search-result.component';
import {H21SearchResultRowModule} from "../h21-search-result-row/h21-search-result-row.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatTabsModule,
		H21SearchResultRowModule
	],
	declarations: [H21SearchResultComponent],
	exports: [H21SearchResultComponent]
})
export class H21SearchResultModule {
}
