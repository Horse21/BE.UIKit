import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule
} from '@angular/material';
import {H21TwoMonthCalendarComponent} from "./h21-two-month-calendar.component"
import {H21TwoMonthCalendarDialogComponent} from "./h21-two-month-calendar-dialog.component"

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
	declarations: [H21TwoMonthCalendarComponent, H21TwoMonthCalendarDialogComponent],
	exports: [H21TwoMonthCalendarComponent],
	entryComponents: [H21TwoMonthCalendarDialogComponent]
})

export class H21TwoMonthCalendarModule {

}
