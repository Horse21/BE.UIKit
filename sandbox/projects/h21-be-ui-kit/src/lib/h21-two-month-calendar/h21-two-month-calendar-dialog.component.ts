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

	ngAfterViewInit() {
		let elementView = document.getElementById('calendar-dialog-body');
		if (elementView) {
			this.sliderItemsBoxWidth = elementView.clientWidth;
			this.sliderItemWidth = this.sliderItemsBoxWidth / this.sliderItemsCount;
			this.init();
		}
	}

	init() {
		this.updateDayCells();
		if (this.data.selectedFromDate) {
			if (this.sliderCurrentIndex > 1) {
				this.moveToSlide(this.sliderCurrentIndex);
			}
		}
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

	checkDateInDayCells(d: Date) {
		if (this.dayCells && this.dayCells.length > 0) {
			return this.dayCells.some((item) => {
				return item.date.getTime() == d.getTime();
			});
		} else {
			return false;
		}
	}

	markSelectedCell(d: Date) {
		if (this.checkDateInDayCells(d)) {
			const ariaLabel = this.getMonthName(d.getMonth()) + ' ' + d.getDate() + ', ' + d.getFullYear();
			let item = this.dayCells.find((item) => {
				return item.arialLabel == ariaLabel;
			});
			item.element.classList.add('c-h21-two-month-calendar_selected');
			if (this.data.rangeSelectMode) {
				if (this.data.selectedToDate) {
					item.element.classList.add(d.getTime() == this.data.selectedToDate.getTime()
						? 'c-h21-two-month-calendar_selected__finish'
						: 'c-h21-two-month-calendar_selected__start');
				}
			}
		}
	}

	unMarkSelectedCell(d: Date) {
		if (this.checkDateInDayCells(d)) {
			const ariaLabel = this.getMonthName(d.getMonth()) + ' ' + d.getDate() + ', ' + d.getFullYear();
			let item = this.dayCells.find((item) => {
				return item.arialLabel == ariaLabel;
			});
			item.element.classList.remove('c-h21-two-month-calendar_selected');
			item.element.classList.remove('c-h21-two-month-calendar_selected__finish');
			item.element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
		}
	}

	unMarkSelected() {
		const elements = Array.from(document.querySelectorAll('.c-h21-two-month-calendar_selected'));
		elements.forEach(item => {
			item.classList.remove('c-h21-two-month-calendar_selected');
			item.classList.remove('c-h21-two-month-calendar_selected__finish');
			item.classList.remove('c-h21-two-month-calendar_selected__start');
		});
	}

	clearHighlight() {
		this.dayCells.forEach(item => {
			item.isHover = false;
			item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
		});
	}

	highlightRange(d: Date = null) {
		if (!d) {
			d = this.data.selectedToDate;
		}
		if (this.data.rangeSelectMode && this.data.selectedFromDate && d) {
			this.dayCells.forEach(item => {
				if (item.date >= this.data.selectedFromDate && item.date <= d) {
					item.isHover = true;
					item.element.classList.add('c-h21-two-month-calendar_range-highlight');
				} else {
					item.isHover = false;
					item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
				}
			});
		}
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
		let elementView = document.getElementById('calendar-dialog-body');
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

	dynamicHighlight(d: Date) {
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

}
