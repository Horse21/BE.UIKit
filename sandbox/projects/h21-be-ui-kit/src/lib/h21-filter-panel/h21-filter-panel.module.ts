import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21FilterPanelComponent} from './h21-filter-panel.component';
import {MatCheckboxModule, MatExpansionModule} from "@angular/material";

@NgModule({
	imports: [
		CommonModule,
		MatExpansionModule,
		MatCheckboxModule
	],
	declarations: [H21FilterPanelComponent],
	exports: [H21FilterPanelComponent]
})

export class H21FilterPanelModule {

}
