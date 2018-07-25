import {Component, Renderer2, Inject, AfterViewInit} from '@angular/core';
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

@Component({
	selector: 'h21-two-month-calendar-dialog',
	templateUrl: './h21-two-month-calendar-dialog.component.html'
})

export class H21TwoMonthCalendarDialogComponent implements AfterViewInit {

	monthNames: Array<string>;
	monthList: Array<any>;
	sliderItemsCount: number;
	sliderItemsBoxWidth: number = 0;
	sliderItemWidth: number = 0;
	sliderCurrentIndex: number;
	sliderCurrentIndexSubject = new Subject();
	sliderCurrentTranslation: number = 0;
	dayCells: any[];

	private _rangeDate: Date;

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
		this.sliderCurrentIndexSubject.subscribe(value => {
			setTimeout(() => {
				this.updateDayCells();
			}, 0);
		});
	}

	ngOnInit() {

	}

	ngAfterViewInit() {
		let elementView = document.getElementById('calendar-menu');
		if (elementView) {
			this.sliderItemsBoxWidth = elementView.clientWidth;
			this.sliderItemWidth = this.sliderItemsBoxWidth / this.sliderItemsCount;
			this.init();
		}
	}

	ngAfterViewChecked() {

	}

	init() {

		this.updateDayCells();

		if (this.data.selectedFromDate) {
			let start = new Date(this.data.selectedFromDate);
			let end = this.data.selectedToDate != null ? new Date(this.data.selectedToDate) : null;
			this.data.selectedFromDate = null;
			this.data.selectedToDate = null;
			if (this.sliderCurrentIndex > 1) {
				this.moveToSlide(this.sliderCurrentIndex);
			}
			this.selectedDateChange(start);
			if (end) {
				this.selectedDateChange(end);
			}
			if (this.data.selectedToDate) {
				this.refreshRange(null);
			}
		}

		this.resetHighlight();

		// if (this.data.selectedFromDate) {
		// 	this.moveToSlide(this.getMonthNumberInList(this.data.selectedFromDate));
		// }
	}

	updateDayCells() {
		if (this.dayCells.length > 0) {
			this.dayCells.length = 0;
		}
		this.dayCells = Array.from(document.querySelectorAll('.mat-calendar-body-cell'))
			.map((x: any) => {
				let xDate = new Date(x.getAttribute('aria-label'));
				return {
					element: x,
					date: xDate,
					isHover: false
				};
			});

		this.dayCells.forEach(item => {
			item.element.addEventListener('mouseover', () => {
				this.refreshRange(item.date);
			});
		});

		this.resetHighlight();
	}

	resetHighlight() {
		let elements = Array.from(document.querySelectorAll(".mat-calendar-body"));
		elements.forEach(element => {
			element.addEventListener('mouseleave', () => {
				if (this.data.selectedFromDate && !this.data.selectedToDate) {
					this.dayCells.filter(item => item.isHover).forEach(item => {
						item.isHover = false;
						item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
					});
				}
			});
		});
	}

	closeDialog() {
		let result = {
			selectedFromDate: this.data.selectedFromDate,
			selectedToDate: this.data.selectedToDate
		};
		this.dialogRef.close(result);
	}

	private getMonthList() {
		let result = [];
		let tmpDate = this._dateAdapter.clone(this.data.startDate);
		while (tmpDate <= this.data.finishDate) {
			result.push({month: tmpDate.getMonth(), year: tmpDate.getFullYear()});
			tmpDate = this._dateAdapter.addCalendarMonths(tmpDate, 1)
		}
		return result;
	}

	// /**
	//  * Returns the name of the month by its index (from 0 to 11)
	//  * @param monthNumber Month index
	//  * @returns {string} Month name
	//  */
	getMonthName(monthNumber): string {
		return monthNumber >= 0 && monthNumber <= 11 ? this.monthNames[monthNumber] : 'undefined';
	}

	// /**
	//  * Returns the date of the first day of the month
	//  * @param {number} month Number of the month (from 0 to 11)
	//  * @param {number} year Year
	//  * @returns {Date} First day of the month
	//  */
	getMonthFirstDay(month: number, year: number): Date {
		return this._dateAdapter.createDate(year, month, 1);
	}

	// /**
	//  * Moves the slider to the left, to the previous month
	//  */
	prevSlide() {
		this.sliderCurrentIndex--;
		this.sliderCurrentIndexSubject.next(this.sliderCurrentIndex);
		this.moveSlide();
	}

	// /**
	//  * Moves the slider to the right, to the next month
	//  */
	nextSlide() {
		this.sliderCurrentIndex++;
		this.sliderCurrentIndexSubject.next(this.sliderCurrentIndex);
		this.moveSlide();
	}

	moveSlide() {
		let elementView = document.getElementById('calendar-menu');
		this.sliderCurrentTranslation = this.sliderCurrentIndex * this.sliderItemWidth;
		this._renderer.setStyle(elementView, 'transform', 'translateX(' + String(-this.sliderCurrentTranslation) + 'px)');
	}

	moveToSlide(slideNumber: number) {
		this.sliderCurrentIndex = slideNumber;
		this.sliderCurrentIndexSubject.next(this.sliderCurrentIndex);
		this.moveSlide();
	}

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

	prevDay(date: Date) {
		let d = new Date(date);
		d.setDate(d.getDate() - 1);
		if (d >= this.data.fromDate) {
			let ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			let element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.remove('c-h21-two-month-calendar_selected');
			element.classList.remove('c-h21-two-month-calendar_selected__finish');
			element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');

			date.setDate(date.getDate() - 1);
			ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.add('c-h21-two-month-calendar_selected');
			if (this.data.selectedToDate) {
				element.classList.add(date.getTime() == this.data.selectedToDate.getTime()
					? 'c-h21-two-month-calendar_selected__finish'
					: 'c-h21-two-month-calendar_selected__start');
			}

			if (this.data.selectedToDate &&
				this.data.selectedToDate.getTime() == this.data.selectedFromDate.getTime()) {
				this.clearSelection();
				return;
			}

			if (this.data.selectedToDate) {
				this.refreshRange(this.data.selectedToDate);
				this.data.selectedToDate = new Date(this.data.selectedToDate);
			}
			this.data.selectedFromDate = new Date(this.data.selectedFromDate);

			let newDateSlideIndex = this.getMonthNumberInList(date);
			if (Math.abs(newDateSlideIndex - this.sliderCurrentIndex) > 0) {

				this.moveToSlide(newDateSlideIndex == 0 ? 0 : newDateSlideIndex - 1);
			}
		}
	}

	nextDay(date: Date) {
		let d = new Date(date);
		d.setDate(d.getDate() + 1);
		if (d <= this.data.toDate) {
			let ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			let element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.remove('c-h21-two-month-calendar_selected');
			element.classList.remove('c-h21-two-month-calendar_selected__finish');
			element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');

			date.setDate(date.getDate() + 1);
			ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.add('c-h21-two-month-calendar_selected');
			if (this.data.selectedToDate) {
				element.classList.add(date.getTime() == this.data.selectedToDate.getTime()
					? 'c-h21-two-month-calendar_selected__finish'
					: 'c-h21-two-month-calendar_selected__start');
			}

			if (this.data.selectedToDate &&
				this.data.selectedToDate.getTime() == this.data.selectedFromDate.getTime()) {
				this.clearSelection();
				return;
			}

			if (this.data.selectedToDate) {
				this.refreshRange(this.data.selectedToDate);
				this.data.selectedToDate = new Date(this.data.selectedToDate);
			}
			this.data.selectedFromDate = new Date(this.data.selectedFromDate);

			let newDateSlideIndex = this.getMonthNumberInList(date);
			if (Math.abs(newDateSlideIndex - this.sliderCurrentIndex) > 1) {
				this.moveToSlide(newDateSlideIndex - 1);
			}
		}
	}

	selectedDateChange($event): void {
		if (!this.data.rangeSelectMode) {
			if (this.data.selectedFromDate) {
				const from = this.data.selectedFromDate;
				const ariaLabel = this.getMonthName(from.getMonth()) + ' ' + from.getDate() + ', ' + from.getFullYear();
				const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				if (element) {
					element.classList.remove('c-h21-two-month-calendar_selected');
				}
			}
			const ariaLabel = this.getMonthName($event.getMonth()) + ' ' + $event.getDate() + ', ' + $event.getFullYear();
			const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.add('c-h21-two-month-calendar_selected');

			this.data.selectedFromDate = $event;
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
		} else {
			if (this.data.selectedToDate) {
				let ariaLabel = this.getMonthName(this.data.selectedToDate.getMonth()) + ' ' + this.data.selectedToDate.getDate() + ', ' + this.data.selectedToDate.getFullYear();
				const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				element.classList.remove('c-h21-two-month-calendar_selected');
				element.classList.remove('c-h21-two-month-calendar_selected__finish');
				element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
			}
			this.data.selectedToDate = $event;
			this.refreshRange($event);
		}

		let ariaLabel = this.getMonthName($event.getMonth()) + ' ' + $event.getDate() + ', ' + $event.getFullYear();
		const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
		element.classList.add('c-h21-two-month-calendar_selected');
		element.classList.add(this.data.selectedToDate ? 'c-h21-two-month-calendar_selected__finish' : 'c-h21-two-month-calendar_selected__start');
	}

	/**
	 * Resets selected dates
	 */
	clearSelection() {
		this.data.selectedFromDate = null;
		this.data.selectedToDate = null;

		const els = Array.from(document.querySelectorAll('.c-h21-two-month-calendar_selected'));
		els.forEach(element => {
			element.classList.remove('c-h21-two-month-calendar_selected');
			element.classList.remove('c-h21-two-month-calendar_selected__finish');
			element.classList.remove('c-h21-two-month-calendar_selected__start');
		});
		let hoverElements = this.dayCells.filter(item => item.isHover);
		hoverElements.forEach(item => {
			item.isHover = false;
			item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
		});
	}

	refreshRange(date: Date) {
		if (!this.data.rangeSelectMode) {
			return;
		}
		if (!this.data.selectedFromDate) {
			return;
		}
		if (this.data.selectedToDate) {
			date = this.data.selectedToDate;
		}
		if (date == this._rangeDate) {
			return;
		}

		if (!this.data.selectedToDate) {
			if (this._rangeDate) {
				let ariaLabel = this.getMonthName(this._rangeDate.getMonth()) + ' ' + this._rangeDate.getDate() + ', ' + this._rangeDate.getFullYear();
				let element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
			}
			let ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			let element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.add('c-h21-two-month-calendar_range-highlight__finish');
		}

		this._rangeDate = new Date(date);

		let hoverElements = this.dayCells.filter(item => item.date >= this.data.selectedFromDate && item.date <= this._rangeDate && !item.isHover);
		hoverElements.forEach(item => {
			item.isHover = true;
			item.element.classList.add('c-h21-two-month-calendar_range-highlight');
		});

		let nonHoverElements = this.dayCells.filter(item => item.isHover && (item.date < this.data.selectedFromDate || item.date > this._rangeDate));
		nonHoverElements.forEach(item => {
			item.isHover = false;
			item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
		});
	}

}
