import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit,
	Inject,
	LOCALE_ID
} from '@angular/core';
import {MatDialog} from "@angular/material";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from "@angular/material";
import {H21TwoMonthCalendarDialogComponent} from "./h21-two-month-calendar-dialog.component";
import {FormControl, Validators} from "@angular/forms";
import {H21TwoMonthCalendarRangeViewMode} from "./h21-two-month-calendar-range-view-mode.enum";
import {formatDate} from "@angular/common";

@Component({
	selector: 'h21-two-month-calendar',
	templateUrl: './h21-two-month-calendar.component.html'
})

export class H21TwoMonthCalendarComponent implements OnInit {

	@Input() required: boolean = false;
	@Input() requiredErrorText: string = 'You must chose date';
	checkRangeViewModeType: any = H21TwoMonthCalendarRangeViewMode;
	@Input() rangeViewMode: H21TwoMonthCalendarRangeViewMode = H21TwoMonthCalendarRangeViewMode.Joint;
	@Input() showWeekdayHint: boolean = false;

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
	@Input() fromLabel: string;
	/** The name of the end date (displayed in the placeholder) */
	@Input() toLabel: string;
	/** The selected range start date, if rangeSelectMode is true, then simply the selected date */
	@Input() selectedFromDate: Date;
	/** The selected end date of the range, if rangeSelectMode is true, then simply the selected date */
	@Input() selectedToDate: Date;
	/** The event of changing the selected initial date of the range, if rangeSelectMode is true, then the date selected */
	@Output() onSelectedFromDateChanged: EventEmitter<Date> = new EventEmitter<Date>();
	/** Event for changing the selected end date of the range */
	@Output() onSelectedToDateChanged: EventEmitter<Date> = new EventEmitter<Date>();

	nightsCount: number = null;
	fromFormControl: FormControl = new FormControl('');
	toFormControl: FormControl = new FormControl('');

	constructor(
		@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
		@Inject(LOCALE_ID) private _locale: string,
		private _dateAdapter: DateAdapter<Date>,
		public dialog: MatDialog
	) {
		this.rangeSelectMode = true;
		this.fromLabel = "Departure date";
		this.toLabel = "Return date";
		this.startDate = this._dateAdapter.today();
		this.finishDate = this._dateAdapter.addCalendarYears(this.startDate, 1);
		this.fromDate = this._dateAdapter.clone(this.startDate);
		this.toDate = this._dateAdapter.clone(this.finishDate);
	}

	ngOnInit() {
		if (this.required) {
			this.fromFormControl.setValidators(Validators.required);
			this.toFormControl.setValidators(Validators.required);
		}
		this.setFieldsValue();
	}

	get invalid(): boolean {
		if (this.rangeSelectMode) {
			return this.fromFormControl.invalid || this.toFormControl.invalid;
		} else {
			return this.fromFormControl.invalid;
		}
	}

	validate(): void {
		this.fromFormControl.updateValueAndValidity();
		this.toFormControl.updateValueAndValidity();
		this.fromFormControl.markAsTouched();
		this.toFormControl.markAsTouched();
	}

	/**
	 * Opens the calendar dialog
	 */
	openDialog(): void {
		this.fromFormControl.markAsPending();
		this.toFormControl.markAsPending();

		var dialogRef = this.dialog.open(H21TwoMonthCalendarDialogComponent, {
			panelClass: 'c-h21-two-month-calendar_dialog',
			backdropClass: 'c-h21-two-month-calendar_dialog-backdrop',
			data: { // we pass the input parameters to initialize the calendar
				rangeSelectMode: this.rangeSelectMode,
				fromDateText: this.fromLabel,
				toDateText: this.toLabel,
				startDate: this.startDate,
				finishDate: this.finishDate,
				fromDate: this.fromDate,
				toDate: this.toDate,
				selectedFromDate: this.selectedFromDate,
				selectedToDate: this.selectedToDate,
				required: this.required
			}
		});
		dialogRef.afterClosed()
			.subscribe(result => { // subscribe to a dialog close event, get the values selected in the calendar
				if (result && result.selectedFromDate) {
					if (this.rangeSelectMode) {
						this.selectedFromDate = result.selectedFromDate;
						this.selectedToDate = result.selectedToDate;
					} else {
						this.selectedFromDate = result.selectedFromDate;
					}
					this.onSelectedFromDateChanged.emit(result.selectedFromDate);
					this.onSelectedToDateChanged.emit(result.selectedToDate);
					this.setNightsCount(result.selectedFromDate, result.selectedToDate);
				} else if (!this.required) {
					this.selectedFromDate = null;
					this.selectedToDate = null;
					this.setNightsCount();
				}
				this.setFieldsValue();
				if (this.required) {
					this.validate();
				}
			});
	}

	setFieldsValue(): void {
		if (this.rangeSelectMode) {
			if (this.rangeViewMode == H21TwoMonthCalendarRangeViewMode.Joint) {
				const dateStr: string =
					(this.selectedFromDate ? formatDate(this.selectedFromDate, 'MM.dd.yy', this._locale) : '') +
					(this.selectedFromDate || this.selectedToDate ? ' - ' : '') +
					(this.selectedToDate ? formatDate(this.selectedToDate, 'MM.dd.yy', this._locale) : '');
				this.fromFormControl.setValue(dateStr);
			} else {
				this.fromFormControl.setValue(this.selectedFromDate ? formatDate(this.selectedFromDate, 'MM.dd.yy', this._locale) : '');
				this.toFormControl.setValue(this.selectedToDate ? formatDate(this.selectedToDate, 'MM.dd.yy', this._locale) : '');
			}
		} else {
			this.fromFormControl.setValue(this.selectedFromDate ? formatDate(this.selectedFromDate, 'MM.dd.yy', this._locale) : '');
		}
	}

	setNightsCount(from?: Date, to?: Date): void {
		if (from && to) {
			const oneDayTime = 86400000; // let oneDayTime = 24 * 60 * 60 * 1000;
			const diffTime = to.getTime() - from.getTime();
			this.nightsCount = diffTime / oneDayTime;
		} else {
			this.nightsCount = null;
		}
	}

	clear(): void {
		this.selectedFromDate = null;
		this.selectedToDate = null;
		this.setNightsCount();
		this.setFieldsValue();
		this.fromFormControl.markAsPending();
		this.toFormControl.markAsPending();
	}
}
