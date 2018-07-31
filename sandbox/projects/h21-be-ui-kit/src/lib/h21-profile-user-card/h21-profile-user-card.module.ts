import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatCardModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatSelectModule,
	MatSlideToggleModule,
	MatTableModule,
	MatTabsModule
} from '@angular/material';

import {H21ProfileUserCardComponent} from "./h21-profile-user-card.component"

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatTabsModule,
		MatTableModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		MatSelectModule,
		MatFormFieldModule,
		MatInputModule
	],
	declarations: [H21ProfileUserCardComponent],
	exports: [H21ProfileUserCardComponent]
})
export class H21ProfileUserCardModule {

}
