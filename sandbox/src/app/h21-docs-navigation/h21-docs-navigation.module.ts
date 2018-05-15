import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatExpansionModule, MatIconModule} from "@angular/material";
import {H21DocsNavigationComponent} from "./h21-docs-navigation.component";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatExpansionModule
	],
	declarations: [H21DocsNavigationComponent],
	exports: [H21DocsNavigationComponent]
})
export class H21DocsNavigationModule {
}
