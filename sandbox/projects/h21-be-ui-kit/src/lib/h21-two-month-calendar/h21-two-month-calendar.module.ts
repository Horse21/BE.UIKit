import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from "@angular/material";
import { H21TwoMonthCalendarComponent } from "./h21-two-month-calendar.component"

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
	],
	declarations: [H21TwoMonthCalendarComponent],
	exports: [H21TwoMonthCalendarComponent]
})

export class H21TwoMonthCalendarModule {

}
