import {
	Component,
	Input,
	Output,
	EventEmitter, OnInit, Inject
} from '@angular/core';
import {MatDialog} from "@angular/material";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from "@angular/material";
import {H21TwoMonthCalendarDialogComponent} from "./h21-two-month-calendar-dialog.component";

@Component({
	selector: 'h21-two-month-calendar',
	templateUrl: './h21-two-month-calendar.component.html'
})

export class H21TwoMonthCalendarComponent implements OnInit {

	@Input() viewMode: 'default' | 'withNights' = 'default';
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
	/** */ // todo - add description
	@Input() suffixText: string;
	/** The selected range start date, if rangeSelectMode is true, then simply the selected date */
	@Input() selectedFromDate: Date;
	/** The selected end date of the range, if rangeSelectMode is true, then simply the selected date */
	@Input() selectedToDate: Date;
	/** The event of changing the selected initial date of the range, if rangeSelectMode is true, then the date selected */
	@Output() onSelectedFromDateChanged: EventEmitter<Date> = new EventEmitter<Date>();
	/** Event for changing the selected end date of the range */
	@Output() onSelectedToDateChanged: EventEmitter<Date> = new EventEmitter<Date>();

	textFieldLabel: string = "";

	constructor(
		@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
		private _dateAdapter: DateAdapter<Date>,
		public dialog: MatDialog
	) {
		this.rangeSelectMode = true;
		this.toDateText = "Departure date";
		this.toDateText = "Return date";
		this.startDate = this._dateAdapter.today();
		this.finishDate = this._dateAdapter.addCalendarYears(this.startDate, 1);
		this.fromDate = this._dateAdapter.clone(this.startDate);
		this.toDate = this._dateAdapter.clone(this.finishDate);
	}

	ngOnInit() {
		if (!this.rangeSelectMode && this.selectedFromDate) {
			this.textFieldLabel = this.formatDate(this.selectedFromDate)
		}
		if (this.rangeSelectMode && this.selectedFromDate && this.selectedToDate) {
			this.textFieldLabel = this.formatDate(this.selectedFromDate) + " - " + this.formatDate(this.selectedToDate);
		}
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
				if (result && result.selectedFromDate) {
					this.textFieldLabel = this.rangeSelectMode
						? this.formatDate(result.selectedFromDate) + " - " + (result.selectedToDate ? this.formatDate(result.selectedToDate) : "")
						: this.formatDate(result.selectedFromDate);
					this.onSelectedFromDateChanged.emit(result.selectedFromDate);
					this.onSelectedToDateChanged.emit(result.selectedToDate);
				} else {
					this.textFieldLabel = "";
					this.onSelectedFromDateChanged.emit(null);
					this.onSelectedToDateChanged.emit(null);
				}
			});
	}

	formatDate(d: Date): string {
		return this.padLeft(this._dateAdapter.getMonth(d)) + '.'
			+ this.padLeft(this._dateAdapter.getDate(d)) + '.'
			+ (this._dateAdapter.getYear(d) - 2000);
	}

	padLeft(n: number): string {
		let str = "" + n;
		let pad = "00";
		return pad.substring(0, pad.length - str.length) + str;
	}
}
