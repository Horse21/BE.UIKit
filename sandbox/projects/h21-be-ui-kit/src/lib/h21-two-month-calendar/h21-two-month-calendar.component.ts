import {
	Component,
	ViewChild,
	ViewChildren,
	Input,
	Output,
	EventEmitter,
	Inject,
	ElementRef,
	Renderer2,
	QueryList, AfterViewInit, HostListener
} from "@angular/core";
import { MatCalendar } from "@angular/material";
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

@Component ({
	selector: 'h21-two-month-calendar',
	templateUrl: './h21-two-month-calendar.component.html'
})

export class H21TwoMonthCalendarComponent implements AfterViewInit {
	@Input() rangeSelectMode: boolean = true;	//
	@Input() startDate: Date; 	//
	@Input() finishDate: Date; 	//
	@Input() fromDate: Date; 	//
	@Input() toDate: Date; 		//

	@ViewChild('twcSliderItemsBox') elementView: ElementRef;

	monthNames: Array<string>;
	monthList: Array<any>;

	/** Количество элементов в слайдере */
	sliderItemsCount: number;
	/** Ширина видимого пространства блока */
	sliderItemsBoxWidth: number = 0;
	sliderItemWidth: number = 0;
	sliderCurrentIndex: number = 0;
	sliderCurrentTranslation: number = 0;

	selectedFromDate: Date;
	selectedToDate: Date;
	dayCells: any[];
	private _rangeDate: Date;

	constructor (
		private renderer: Renderer2,
		@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
		private dateAdapter: DateAdapter<Date>,
		private elementRef: ElementRef
	) {
		this.startDate = this.dateAdapter.today();
		this.finishDate = this.dateAdapter.addCalendarYears(this.startDate, 1);
		this.fromDate = this.dateAdapter.clone(this.startDate);
		this.toDate = this.dateAdapter.clone(this.finishDate);
		this.monthNames =  this.dateAdapter.getMonthNames('long');
		this.monthList = this.getMonthList();
		this.sliderItemsCount = this.monthList.length;
	}

	ngAfterViewInit() {
		this.sliderItemsBoxWidth = this.elementView.nativeElement.clientWidth;
		this.sliderItemWidth = this.sliderItemsBoxWidth / this.sliderItemsCount;

		this.dayCells = Array.from(this.elementRef.nativeElement.querySelectorAll(".mat-calendar-body-cell"))
			.map((x: any)=>{
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
	}

	/**
	 *
	 */
	prevSlide() {
		this.sliderCurrentIndex--;
		this.moveSlide();
	}

	/**
	 *
	 */
	nextSlide() {
		this.sliderCurrentIndex++;
		this.moveSlide();
	}

	/**
	 *
	 */
	moveSlide() {
		this.sliderCurrentTranslation = this.sliderCurrentIndex * this.sliderItemWidth;
		this.renderer.setStyle(this.elementView.nativeElement, 'transform', 'translateX(' + String(-this.sliderCurrentTranslation) + 'px)');
	}

	/**
	 * Возвращает полное название меяца по его порядковому номеру
	 * @param monthNumber Порядковый номер месяца (от 0 до 11)
	 * @returns {string} Название месяца
	 */
	getMonthName(monthNumber): string {
		return monthNumber >= 0 && monthNumber <= 11 ? this.monthNames[monthNumber] : 'undefined';
	}

	/**
	 * Возвращает дату первого для месяца по заданным параметрам
	 * @param {number} month Номер месяца (от 0 до 11)
	 * @param {number} year Год
	 * @returns {Date}
	 */
	getMonthFirstDay(month: number, year: number): Date {
		return this.dateAdapter.createDate(year, month, 1);
	}

	/**
	 * Возвращает массив
	 * @returns {any[]}
	 */
	private getMonthList() {
		let result = new Array();
		let tmpDate = this.dateAdapter.clone(this.startDate);
		while (tmpDate <= this.finishDate) {
			result.push({month: tmpDate.getMonth(), year: tmpDate.getFullYear()});
			tmpDate = this.dateAdapter.addCalendarMonths(tmpDate, 1)
		}
		return result;
	}

	selectedDateChange($event) {
		if (!this.rangeSelectMode) {
			this.selectedFromDate = $event;
			return;
		}
		if (this.selectedFromDate == $event) {
			return;
		}
		if (this.selectedFromDate > $event) {
			this.clearSelection();
			return;
		}

		if (!this.selectedFromDate) {
			this.selectedFromDate = $event;
		} else {
			if (this.selectedToDate) {
				let ariaLabel = this.getMonthName(this.selectedToDate.getMonth()) + ' ' + this.selectedToDate.getDate() + ', ' + this.selectedToDate.getFullYear();
				const element = this.elementRef.nativeElement.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				element.classList.remove('c-h21-two-month-calendar_selected');
				element.classList.remove('c-h21-two-month-calendar_selected__finish');
				element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
			}
			this.selectedToDate = $event;
			this.refreshRange($event);
		}

		let ariaLabel = this.getMonthName($event.getMonth()) + ' ' + $event.getDate() + ', ' + $event.getFullYear();
		const element = this.elementRef.nativeElement.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
		element.classList.add('c-h21-two-month-calendar_selected');
		element.classList.add(this.selectedToDate ? 'c-h21-two-month-calendar_selected__finish' : 'c-h21-two-month-calendar_selected__start');
	}

	clearSelection() {
		this.selectedFromDate = null;
		this.selectedToDate = null;
		const els = this.elementRef.nativeElement.querySelectorAll('.c-h21-two-month-calendar_selected');
		els.forEach(element => {
			element.classList.remove('c-h21-two-month-calendar_selected');
			element.classList.remove('c-h21-two-month-calendar_selected__finish');
			element.classList.remove('c-h21-two-month-calendar_selected__start');
		});
		let hoverElements = this.dayCells.filter(item=>item.isHover);
		hoverElements.forEach(item => {
			item.isHover = false;
			item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
		});
	}

	refreshRange(date: Date) {
		if (!this.selectedFromDate) {
			return;
		}
		if (this.selectedToDate) {
			date = this.selectedToDate;
		}
		if (date == this._rangeDate)
			return;

		if (!this.selectedToDate) {
			if (this._rangeDate) {
				let ariaLabel = this.getMonthName(this._rangeDate.getMonth()) + ' ' + this._rangeDate.getDate() + ', ' + this._rangeDate.getFullYear();
				let element = this.elementRef.nativeElement.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
			}
			let ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			let element = this.elementRef.nativeElement.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.add('c-h21-two-month-calendar_range-highlight__finish');
		}

		this._rangeDate = new Date(date);

		let hoverElements = this.dayCells.filter(item=>item.date >= this.selectedFromDate && item.date <= this._rangeDate && !item.isHover);
		hoverElements.forEach(item => {
			item.isHover = true;
			item.element.classList.add('c-h21-two-month-calendar_range-highlight');
		});

		let nonHoverElements = this.dayCells.filter(item=>item.isHover && (item.date < this.selectedFromDate || item.date > this._rangeDate));
		nonHoverElements.forEach(item => {
			item.isHover = false;
			item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
		});
	}
}
