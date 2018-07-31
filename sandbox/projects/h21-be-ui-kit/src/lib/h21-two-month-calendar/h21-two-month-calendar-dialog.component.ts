import {Component, Renderer2, Inject, AfterViewInit, HostListener} from '@angular/core';
import {Subject} from 'rxjs';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MatDateFormats,
	MatDialogRef,
	MAT_DIALOG_DATA
} from "@angular/material";

export interface DialogData {
	rangeSelectMode: boolean;
	fromDateText: string;
	toDateText: string;
	startDate: Date;
	finishDate: Date;
	fromDate: Date;
	toDate: Date;
	selectedFromDate: Date,
	selectedToDate: Date
}

// export interface DayCell {
// 	element: any,
// 	date: Date,
// 	arialLabel: string,
// 	isHover: boolean
// }

@Component({
	selector: 'h21-two-month-calendar-dialog',
	templateUrl: './h21-two-month-calendar-dialog.component.html'
})

export class H21TwoMonthCalendarDialogComponent implements AfterViewInit {

	/** List of month names */
	monthNames: Array<string>;
	/** An array of months in the form of objects - {month: "", year: ""} */
	monthList: Array<any>;
	/** Number of slider cells */
	sliderItemsCount: number;
	/** Slider width, in pixels */
	sliderItemsBoxWidth: number = 0;
	/** The width of one cell of the slider, in pixels */
	sliderItemWidth: number = 0;
	/** Index of the current cell of the slider */
	sliderCurrentIndex: number;
	/** Subscriber to change the sliderCurrentIndex property */
	sliderCurrentIndexSubject = new Subject();
	/** The current slider shift relative to the first cell, in pixels */
	sliderCurrentTranslation: number = 0;
	/** An array with cells of currently active calendars */
	dayCells: any[]; // DayCell[]

	// private screenWidth: number;
	// private minScreenWidth: number = 768;
	// tabletView: boolean = false;
	// showAllCells: boolean = false;

	// @HostListener('window:resize', ['$event']) onResize(event ?) {
	// 	this.screenWidth = window.innerWidth;
	// }

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
				public dialogRef: MatDialogRef<H21TwoMonthCalendarDialogComponent>,
				private _renderer: Renderer2,
				@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
				private _dateAdapter: DateAdapter<Date>
	) {
		this.monthNames = this._dateAdapter.getMonthNames('long');
		this.monthList = this.getMonthList();
		this.sliderItemsCount = this.getMonthList().length;
		this.dayCells = new Array();

		let startIndex = 0
		if (this.data.selectedFromDate) {
			startIndex = this.getMonthNumberInList(this.data.selectedFromDate);
			startIndex = startIndex == 1 ? 0 :
				(startIndex == this.monthList.length - 1 ? startIndex - 1 : startIndex);
		}
		this.sliderCurrentIndex = startIndex;
		this.sliderCurrentIndexSubject.subscribe(value => { // subscribe to change the index of the active cell of the slider
			setTimeout(() => {
				this.updateDayCells(); // update the list of cells in the calendar
			}, 0);
		});

		// this.onResize();
		// if (this.screenWidth <= this.minScreenWidth) {
		// 	this.tabletView = true;
		// }
	}

	ngAfterViewInit() {
		let elementView = document.getElementById('calendar-dialog-body');
		if (elementView) {
			this.sliderItemsBoxWidth = elementView.clientWidth;
			this.sliderItemWidth = this.sliderItemsBoxWidth / this.sliderItemsCount;
			this.init();
		}
	}

	/**
	 * Closes the dialog, passes the selected dates to the link.
	 */
	closeDialog() {
		let result = {
			selectedFromDate: this.data.selectedFromDate,
			selectedToDate: this.data.selectedToDate
		};
		this.dialogRef.close(result);
	}

	/**
	 * Returns an array of months (as objects {month: "", year: ""}) for the range of the specified data.startDate and data.finishDate.
	 * @returns An array of objects - {month: "", year: ""}
	 */
	private getMonthList() {
		let result = [];
		let tmpDate = this._dateAdapter.clone(this.data.startDate);
		while (tmpDate <= this.data.finishDate) {
			result.push({month: tmpDate.getMonth(), year: tmpDate.getFullYear()});
			tmpDate = this._dateAdapter.addCalendarMonths(tmpDate, 1)
		}
		return result;
	}

	/**
	 * Returns the name of the month by its index (from 0 to 11).
	 * @param monthNumber Month index
	 * @returns Month name
	 */
	getMonthName(monthNumber): string {
		return monthNumber >= 0 && monthNumber <= 11 ? this.monthNames[monthNumber] : 'undefined';
	}

	/**
	 * Returns the date of the first day of the month.
	 * @param month Number of the month (from 0 to 11)
	 * @param year Year
	 * @returns First day of the month
	 */
	getMonthFirstDay(month: number, year: number): Date {
		return this._dateAdapter.createDate(year, month, 1);
	}

	/**
	 * Returns the index of the month's position in the monthList array by the specified date.
	 * @param date
	 * @returns Month
	 */
	private getMonthNumberInList(date: Date): number {
		let month = date.getMonth();
		let year = date.getFullYear();
		for (let i = 0; i < this.monthList.length; i++) {
			if (this.monthList[i].month == month && this.monthList[i].year == year) {
				return i;
			}
		}
		return 0;
	}

	/**
	 * Performs the initial initialization of the component in ngAfterViewInit().
	 */
	private init() {
		this.updateDayCells();
		if (this.data.selectedFromDate) {
			if (this.sliderCurrentIndex > 1) {
				this.moveToSlide(this.sliderCurrentIndex);
			}
		}
	}

	/**
	 * Update array of calendar cells - dayCells.
	 */
	private updateDayCells() {
		if (this.dayCells.length > 0) {
			this.dayCells.length = 0;
		}
		this.dayCells = Array.from(document.querySelectorAll('.mat-calendar-body-cell'))
			.map((x: any) => {
				let xDate = new Date(x.getAttribute('aria-label'));
				return {
					element: x,
					date: xDate,
					arialLabel: x.getAttribute('aria-label'),
					isHover: false
				};
			});

		this.highlightRange();
		if (this.data.selectedFromDate && this.checkDateInDayCells(this.data.selectedFromDate)) {
			this.markSelectedCell(this.data.selectedFromDate);
		}
		if (this.data.selectedToDate && this.checkDateInDayCells(this.data.selectedToDate)) {
			this.markSelectedCell(this.data.selectedToDate);
		}

		this.dayCells.forEach(item => {
			item.element.addEventListener('mouseover', () => {
				this.dynamicHighlight(item.date);
			});
		});

		if (this.data.rangeSelectMode) {
			let elements = Array.from(document.querySelectorAll(".mat-calendar-body"));
			elements.forEach(item => {
				item.addEventListener('mouseleave', () => {
					if (this.data.selectedFromDate && !this.data.selectedToDate) {
						this.clearHighlight();
					}
				});
			});
		}
	}

	/**
	 * Checks whether the specified date is present in the array of cells of the calendar - dayCells.
	 * @param d Check date
	 * @returns true - if successful, false otherwise
	 */
	private checkDateInDayCells(d: Date) {
		if (this.dayCells && this.dayCells.length > 0) {
			return this.dayCells.some((item) => {
				return item.date.getTime() == d.getTime();
			});
		} else {
			return false;
		}
	}

	/**
	 * Marks the cell of the calendar with the specified date as the selected.
	 * @param d Date
	 */
	private markSelectedCell(d: Date) {
		if (this.checkDateInDayCells(d)) {
			const ariaLabel = this.getMonthName(d.getMonth()) + ' ' + d.getDate() + ', ' + d.getFullYear();
			let item = this.dayCells.find((item) => {
				return item.arialLabel == ariaLabel;
			});
			item.element.classList.add('c-h21-two-month-calendar_selected');
			if (this.data.rangeSelectMode) {
				item.element.classList.add(d.getTime() == this.data.selectedFromDate.getTime()
					? 'c-h21-two-month-calendar_selected__start'
					: 'c-h21-two-month-calendar_selected__finish');
			}
		}
	}

	/**
	 * Cancels the selection of a calendar cell with the specified date.
	 * @param d Date
	 */
	private unMarkSelectedCell(d: Date) {
		if (this.checkDateInDayCells(d)) {
			const ariaLabel = this.getMonthName(d.getMonth()) + ' ' + d.getDate() + ', ' + d.getFullYear();
			let item = this.dayCells.find((item) => {
				return item.arialLabel == ariaLabel;
			});
			item.element.classList.remove('c-h21-two-month-calendar_selected');
			item.element.classList.remove('c-h21-two-month-calendar_selected__start');
			item.element.classList.remove('c-h21-two-month-calendar_selected__finish');
		}
	}

	/**
	 * Uncheck all cells in the calendar marked as selected.
	 */
	private unMarkSelected() {
		const elements = Array.from(document.querySelectorAll('.c-h21-two-month-calendar_selected'));
		elements.forEach(item => {
			item.classList.remove('c-h21-two-month-calendar_selected');
			item.classList.remove('c-h21-two-month-calendar_selected__start');
			item.classList.remove('c-h21-two-month-calendar_selected__finish');
		});
	}

	/**
	 * Removes highlight from all cells of the calendar.
	 */
	private clearHighlight() {
		this.dayCells.forEach(item => {
			item.isHover = false;
			item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
			item.element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
		});
	}

	/**
	 * Highlights the range of calendar cells from the selected start date to the specified date, if the date is not
	 * specified, the selected end date is taken.
	 * @param d The end date of the range for highlighting, the default is null
	 */
	private highlightRange(d: Date = null) {
		if (!d) {
			d = this.data.selectedToDate;
		}
		if (this.data.rangeSelectMode && this.data.selectedFromDate && d) {
			this.dayCells.forEach(item => {
				if (item.date >= this.data.selectedFromDate && item.date <= d) {
					item.isHover = true;
					item.element.classList.add('c-h21-two-month-calendar_range-highlight');
					if (item.date == d) {
						item.element.classList.add('c-h21-two-month-calendar_range-highlight__finish');
					} else {
						item.element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
					}
				} else {
					item.isHover = false;
					item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
				}
			});
		}
	}

	/**
	 * Highlights the range of calendar cells before the specified date.
	 * @param d Date
	 */
	private dynamicHighlight(d: Date) {
		if (!this.data.rangeSelectMode) {
			return;
		}
		if (!this.data.selectedFromDate) {
			return;
		}
		if (this.data.selectedToDate) {
			return;
		}
		this.highlightRange(d);
	}

	/**
	 * Moves the slider to the previous cell of the slider, making it active.
	 */
	prevSlide() {
		this.sliderCurrentIndex--;
		this.sliderCurrentIndexSubject.next(this.sliderCurrentIndex);
		this.moveSlide();
	}

	/**
	 * Moves the slider to the next cell of the slider, making it active.
	 */
	nextSlide() {
		this.sliderCurrentIndex++;
		this.sliderCurrentIndexSubject.next(this.sliderCurrentIndex);
		this.moveSlide();
	}

	/**
	 * Moves the slider to the active slider cell whose index is specified in sliderCurrentIndex.
	 */
	private moveSlide() {
		let elementView = document.getElementById('calendar-dialog-body');
		this.sliderCurrentTranslation = this.sliderCurrentIndex * this.sliderItemWidth;
		this._renderer.setStyle(elementView, 'transform', 'translateX(' + String(-this.sliderCurrentTranslation) + 'px)');
	}

	/**
	 * Moves the slider to the specified slider cell, making it active.
	 * @param slideNumber Cell index
	 */
	private moveToSlide(slideNumber: number) {
		this.sliderCurrentIndex = slideNumber;
		this.sliderCurrentIndexSubject.next(this.sliderCurrentIndex);
		this.moveSlide();
	}

	/**
	 * Shifts the selected date one day ago.
	 * @param date Selected date
	 */
	prevDay(date: Date) {
		let d = new Date(date);
		d.setDate(d.getDate() - 1);
		if (d >= this.data.fromDate) {
			this.unMarkSelectedCell(date);
			date.setDate(date.getDate() - 1);
			if (this.data.selectedToDate &&
				this.data.selectedToDate.getTime() == this.data.selectedFromDate.getTime()) {
				this.clearSelection();
				return;
			}
			if (this.data.selectedToDate) {
				this.data.selectedToDate = new Date(this.data.selectedToDate);
			}
			this.data.selectedFromDate = new Date(this.data.selectedFromDate);
			let newDateSlideIndex = this.getMonthNumberInList(date);
			if (Math.abs(newDateSlideIndex - this.sliderCurrentIndex) > 0) {
				this.moveToSlide(newDateSlideIndex == 0 ? 0 : newDateSlideIndex - 1);
			} else {
				this.highlightRange();
				this.markSelectedCell(date);
			}
		}
	}

	/**
	 * Shifts the selected date one day ahead.
	 * @param date Selected date
	 */
	nextDay(date: Date) {
		let d = new Date(date);
		d.setDate(d.getDate() + 1);
		if (d <= this.data.toDate) {
			this.unMarkSelectedCell(date);
			date.setDate(date.getDate() + 1);
			if (this.data.selectedToDate &&
				this.data.selectedToDate.getTime() == this.data.selectedFromDate.getTime()) {
				this.clearSelection();
				return;
			}
			if (this.data.selectedToDate) {
				this.data.selectedToDate = new Date(this.data.selectedToDate);
			}
			this.data.selectedFromDate = new Date(this.data.selectedFromDate);

			let newDateSlideIndex = this.getMonthNumberInList(date);
			if (Math.abs(newDateSlideIndex - this.sliderCurrentIndex) > 1) {
				this.moveToSlide(newDateSlideIndex - 1);
			} else {
				this.highlightRange();
				this.markSelectedCell(date);
			}
		}
	}

	/**
	 * Sets the selected date, marks the calendar cell as the selected.
	 * @param $event Selected date
	 */
	selectedDateChange($event): void {
		if (!this.data.rangeSelectMode) {
			if (this.data.selectedFromDate) {
				this.unMarkSelectedCell(this.data.selectedFromDate);
			}
			this.data.selectedFromDate = $event;
			this.markSelectedCell(this.data.selectedFromDate);
			return;
		}
		if (this.data.selectedFromDate == $event) {
			return;
		}
		if (this.data.selectedFromDate > $event) {
			this.clearSelection();
			return;
		}
		if (!this.data.selectedFromDate) {
			this.data.selectedFromDate = $event;
			this.markSelectedCell(this.data.selectedFromDate);
		} else {
			if (this.data.selectedToDate && this.checkDateInDayCells(this.data.selectedToDate)) {
				this.unMarkSelectedCell(this.data.selectedToDate);
			}
			this.data.selectedToDate = $event;
			this.highlightRange();
			this.markSelectedCell(this.data.selectedToDate);
		}
	}

	/**
	 * Resets selected dates
	 */
	clearSelection() {
		this.data.selectedFromDate = null;
		this.data.selectedToDate = null;
		this.unMarkSelected();
		this.clearHighlight();
	}

	// activateShowAllCells($event) {
	// 	console.log($event);
	// 	if (this.tabletView) {
	// 		this.showAllCells = true;
	// 	}
	// }
}
