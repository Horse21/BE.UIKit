import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { H21FilterPanelComponent } from './h21-filter-panel.component';
import { MatButtonModule, MatCheckboxModule, MatExpansionModule } from '@angular/material';
import { NouisliderModule } from 'ng2-nouislider';

@NgModule({
	imports: [
		CommonModule,
		MatExpansionModule,
		MatCheckboxModule,
		NouisliderModule,
		MatButtonModule
	],
	declarations: [H21FilterPanelComponent],
	exports: [H21FilterPanelComponent]
})

export class H21FilterPanelModule {

}
