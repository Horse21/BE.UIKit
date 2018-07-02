import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule
} from '@angular/material';
import { H21TwoMonthCalendarComponent } from "./h21-two-month-calendar.component"

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatMenuModule,
		MatDatepickerModule,
		MatInputModule
	],
	declarations: [H21TwoMonthCalendarComponent],
	exports: [H21TwoMonthCalendarComponent]
})

export class H21TwoMonthCalendarModule {

}
