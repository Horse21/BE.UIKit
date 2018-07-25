import {
	Component,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import {MatDialog} from "@angular/material";
import {DateAdapter} from '@angular/material';
import {H21TwoMonthCalendarDialogComponent} from "./h21-two-month-calendar-dialog.component";

@Component({
	selector: 'h21-two-month-calendar',
	templateUrl: './h21-two-month-calendar.component.html'
})

export class H21TwoMonthCalendarComponent {

	@Input() rangeSelectMode: boolean;
	@Input() startDate: Date;
	@Input() finishDate: Date;
	@Input() fromDate: Date;
	@Input() toDate: Date;
	@Input() fromDateText: string;
	@Input() toDateText: string;
	@Input() selectedFromDate: Date;
	@Input() selectedToDate: Date;
	@Output() onSelectedFromDateChanged: EventEmitter<Date> = new EventEmitter<Date>();
	@Output() onSelectedToDateChanged: EventEmitter<Date> = new EventEmitter<Date>();

	constructor(
		private _dateAdapter: DateAdapter<Date>,
		public dialog: MatDialog
	) {
		this.rangeSelectMode = true;
		this.fromDateText = "Departure date";
		this.toDateText = "Return date";
		this.startDate = this._dateAdapter.today();
		this.finishDate = this._dateAdapter.addCalendarYears(this.startDate, 1);
		this.fromDate = this._dateAdapter.clone(this.startDate);
		this.toDate = this._dateAdapter.clone(this.finishDate);
	}

	openDialog(): void {
		var dialogRef = this.dialog.open(H21TwoMonthCalendarDialogComponent, {
			panelClass: 'c-h21-two-month-calendar_dialog',
			backdropClass: 'c-h21-two-month-calendar_dialog-backdrop',
			data: {
				rangeSelectMode: this.rangeSelectMode,
				fromDateText: this.fromDateText,
				toDateText: this.toDateText,
				startDate: this.startDate,
				finishDate: this.finishDate,
				fromDate: this.fromDate,
				toDate: this.toDate,
				selectedFromDate: this.selectedFromDate,
				selectedToDate: this.selectedToDate
			}
		});
		dialogRef.afterClosed()
			.subscribe(result => {
				if (result) {
					this.onSelectedFromDateChanged.emit(result.selectedFromDate);
					this.onSelectedToDateChanged.emit(result.selectedToDate);
				}
			});
	}
}
