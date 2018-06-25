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
import {MatCalendar, MatMenuTrigger} from "@angular/material";
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material';

@Component ({
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
	@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

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
		this.rangeSelectMode = true;
		this.fromDateText = "Departure date";
		this.toDateText = "Return date";
		this.startDate = this.dateAdapter.today();
		this.finishDate = this.dateAdapter.addCalendarYears(this.startDate, 1);
		this.fromDate = this.dateAdapter.clone(this.startDate);
		this.toDate = this.dateAdapter.clone(this.finishDate);
		this.monthNames =  this.dateAdapter.getMonthNames('long');
		this.monthList = this.getMonthList();
		this.sliderItemsCount = this.monthList.length;
	}

	ngAfterViewInit() {

	}

	init() {
		let elementView = document.getElementById('calendar-menu');
		if (!elementView) {
			return;
		}

		this.sliderItemsBoxWidth = elementView.clientWidth;
		this.sliderItemWidth = this.sliderItemsBoxWidth / this.sliderItemsCount;

		this.dayCells = Array.from(document.querySelectorAll(".mat-calendar-body-cell"))
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

		if (this.selectedFromDate) {
			let start = new Date(this.selectedFromDate);
			let end = this.selectedToDate != null ? new Date(this.selectedToDate) : null;
			this.selectedFromDate = null;
			this.selectedToDate = null;
			this.selectedDateChange(start);
			if (end) {
				this.selectedDateChange(end);
			}
			this.refreshRange(null);
		}

		if (this.selectedFromDate) {
			// todo:
		}
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
	 * @param {number} slideNumber
	 */
	moveToSlide(slideNumber: number) {
		this.sliderCurrentIndex = slideNumber;
		this.moveSlide();
	}

	/**
	 *
	 */
	moveSlide() {
		let elementView = document.getElementById('calendar-menu');
		this.sliderCurrentTranslation = this.sliderCurrentIndex * this.sliderItemWidth;
		this.renderer.setStyle(elementView, 'transform', 'translateX(' + String(-this.sliderCurrentTranslation) + 'px)');
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

	/**
	 *
	 * @param {Date} date
	 * @returns {Date}
	 */
	prevDay(date: Date)
	{
		let newDate = this.dateAdapter.addCalendarDays(date, -1);
		if (newDate >= this.fromDate) {
			return newDate;
		} else {
			return date;
		}
	}

	/**
	 *
	 * @param {Date} date
	 * @returns {Date}
	 */
	nextDay(date: Date)
	{
		let newDate = this.dateAdapter.addCalendarDays(date, 1);
		if (newDate <= this.toDate) {
			this.selectedDateChange(newDate);
			return newDate;
		} else {
			return date;
		}
	}

	selectedDateChange($event) {
		if (!this.rangeSelectMode) {
			if (this.selectedFromDate) {
				const from = this.selectedFromDate;
				const ariaLabel = this.getMonthName(from.getMonth()) + ' ' + from.getDate() + ', ' + from.getFullYear();
				const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				element.classList.remove('c-h21-two-month-calendar_selected');
			}
			const ariaLabel = this.getMonthName($event.getMonth()) + ' ' + $event.getDate() + ', ' + $event.getFullYear();
			const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.add('c-h21-two-month-calendar_selected');

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
				const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				element.classList.remove('c-h21-two-month-calendar_selected');
				element.classList.remove('c-h21-two-month-calendar_selected__finish');
				element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
			}
			this.selectedToDate = $event;
			this.refreshRange($event);
		}

		let ariaLabel = this.getMonthName($event.getMonth()) + ' ' + $event.getDate() + ', ' + $event.getFullYear();
		const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
		element.classList.add('c-h21-two-month-calendar_selected');
		element.classList.add(this.selectedToDate ? 'c-h21-two-month-calendar_selected__finish' : 'c-h21-two-month-calendar_selected__start');
	}

	clearSelection() {
		this.selectedFromDate = null;
		this.selectedToDate = null;
		const els = Array.from(document.querySelectorAll('.c-h21-two-month-calendar_selected'));
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
		if (!this.rangeSelectMode) {
			return;
		}
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
				let element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
			}
			let ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			let element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
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

	showMenu() {
		this.trigger.openMenu();
		this.init();
	}
}
