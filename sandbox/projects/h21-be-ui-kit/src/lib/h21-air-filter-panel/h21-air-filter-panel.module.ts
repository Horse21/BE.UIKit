import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21AirFilterPanelComponent} from './h21-air-filter-panel.component';
import {
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule,
	MatExpansionModule
} from '@angular/material';
import {NouisliderModule} from 'ng2-nouislider';

@NgModule({
	imports: [
		CommonModule,
		MatExpansionModule,
		MatCheckboxModule,
		NouisliderModule,
		MatButtonModule,
		MatButtonToggleModule
	],
	declarations: [H21AirFilterPanelComponent],
	exports: [H21AirFilterPanelComponent]
})

export class H21AirFilterPanelModule {

}
