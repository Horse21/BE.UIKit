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

	/** Date selection mode, if true - the date range (the start and end date of the range are selected), if false, one date. */
	@Input() rangeSelectMode: boolean;
	/** Start date of the range displayed in the calendar */
	@Input() startDate: Date;
	/** The end date of the range displayed in the calendar */
	@Input() finishDate: Date;
	/** The start date of the range available for selection in the calendar */
	@Input() fromDate: Date;
	/** The end date of the range available for selection in the calendar */
	@Input() toDate: Date;
	/** The name of the starting date (displayed in the placeholder) */
	@Input() fromDateText: string;
	/** The name of the end date (displayed in the placeholder) */
	@Input() toDateText: string;
	/** The selected range start date, if rangeSelectMode is true, then simply the selected date */
	@Input() selectedFromDate: Date;
	/** The selected end date of the range, if rangeSelectMode is true, then simply the selected date */
	@Input() selectedToDate: Date;
	/** The event of changing the selected initial date of the range, if rangeSelectMode is true, then the date selected */
	@Output() onSelectedFromDateChanged: EventEmitter<Date> = new EventEmitter<Date>();
	/** Event for changing the selected end date of the range */
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

	/**
	 * Opens the calendar dialog
	 */
	openDialog(): void {
		var dialogRef = this.dialog.open(H21TwoMonthCalendarDialogComponent, {
			panelClass: 'c-h21-two-month-calendar_dialog',
			backdropClass: 'c-h21-two-month-calendar_dialog-backdrop',
			data: { // we pass the input parameters to initialize the calendar
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
			.subscribe(result => { // subscribe to a dialog close event, get the values selected in the calendar
				if (result) {
					this.onSelectedFromDateChanged.emit(result.selectedFromDate);
					this.onSelectedToDateChanged.emit(result.selectedToDate);
				}
			});
	}
}
