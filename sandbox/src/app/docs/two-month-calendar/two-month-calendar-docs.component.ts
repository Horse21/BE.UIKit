import {Component} from "@angular/core";
import {DateAdapter} from "@angular/material";

@Component({
	selector: 'two-month-calendar-docs',
	templateUrl: './two-month-calendar-docs.component.html'
})

export class TwoMonthCalendarDocsComponent {

	/** Section title */
	title = 'Two month calendar component';

	startDate: Date;
	finishDate: Date;
	startText: string;
	finishText: string;

	startDiapason: Date;
	finishDiapason: Date;

	constructor(private _dateAdapter: DateAdapter<Date>) {
		this.startText = "Start";
		this.finishText = "Finish";
		this.startDate = this._dateAdapter.addCalendarDays(new Date(), 1);
		this.finishDate = this._dateAdapter.addCalendarMonths(this.startDate, 1);


		this.startDiapason = new Date();
		this.finishDiapason = this._dateAdapter.addCalendarMonths(this.startDiapason, 1);
	}

	updateStartDate($event) {
		this.startDate = $event;
	}

	updateFinishDate($event) {
		this.finishDate = $event;
	}
}
