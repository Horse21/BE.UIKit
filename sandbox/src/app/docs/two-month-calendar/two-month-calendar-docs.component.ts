import {Component} from "@angular/core";

@Component({
	selector: 'two-month-calendar-docs',
	templateUrl: './two-month-calendar-docs.component.html'
})

export class TwoMonthCalendarDocsComponent {
	/** Section title */
	title = 'Two month calendar component';

	starDate: Date;
	finishDate: Date;
	starText: string;
	finishText: string;
	selectedDate: Date;

	constructor() {
		this.starDate = new Date();
		this.finishDate = new Date(this.starDate.getFullYear(), this.starDate.getMonth() + 4, this.starDate.getDay());
		this.starText = "Start";
		this.finishText = "Finish";
		this.selectedDate = new Date(this.starDate.getFullYear(), this.starDate.getMonth(), this.starDate.getDay())
	}
}

