import {
	Component,
	ViewChild,
	Input,
	Inject,
	ElementRef,
	Renderer2, Output, EventEmitter
} from '@angular/core';
import { MatMenuTrigger } from "@angular/material";
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

	@Output() onArrivalDateChanged: EventEmitter<Date> = new EventEmitter<Date>();
	@Output() onReturnDateChanged: EventEmitter<Date> = new EventEmitter<Date>();

	monthNames: Array<string>;
	monthList: Array<any>;

	sliderItemsCount: number;
	sliderItemsBoxWidth: number = 0;
	sliderItemWidth: number = 0;
	sliderCurrentIndex: number = 0;
	sliderCurrentTranslation: number = 0;

	@Input() selectedFromDate: Date;
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
		this.sliderItemsCount = this.getMonthList().length;
	}

	ngAfterViewInit() {
		this.trigger.menuOpened.subscribe(() => {
			document.querySelector('body').classList.add('cdk-overlay-container__for-h21-tmc');
		});
		this.trigger.menuClosed.subscribe(() => {
			setTimeout(() => {document.querySelector('body').classList.remove('cdk-overlay-container__for-h21-tmc')},
				500);
		});
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
			this.onArrivalDateChanged.emit(this.selectedFromDate);
			this.onReturnDateChanged.emit(this.selectedToDate);

			this.selectedDateChange(start);
			if (end) {
				this.selectedDateChange(end);
			}
			this.refreshRange(null);
		}

		// mouse leave
		let elements = Array.from(document.querySelectorAll(".mat-calendar-body"));
		elements.forEach(element => {
			element.addEventListener('mouseleave', () => {
				if (this.selectedFromDate && !this.selectedToDate) {
					this.dayCells.filter(item=>item.isHover).forEach(item => {
						item.isHover = false;
						item.element.classList.remove('c-h21-two-month-calendar_range-highlight');
					});
				}
			});
		});

		if (this.selectedFromDate) {
			// todo:
			this.moveToSlide(this.getMonthNumberInList(this.selectedFromDate));
		}
	}

	prevSlide() {
		this.sliderCurrentIndex--;
		this.moveSlide();
	}

	nextSlide() {
		this.sliderCurrentIndex++;
		this.moveSlide();
	}


	moveToSlide(slideNumber: number) {
		this.sliderCurrentIndex = slideNumber;
		this.moveSlide();
	}

	private getMonthNumberInList (date: Date): number {
		let month = date.getMonth();
		let year = date.getFullYear();
		for (let i = 0; i < this.monthList.length; i++) {
			if (this.monthList[i].month == month && this.monthList[i].year == year) {
				return i;
			}
		}
		return 0;
	}

	moveSlide() {
		let elementView = document.getElementById('calendar-menu');
		this.sliderCurrentTranslation = this.sliderCurrentIndex * this.sliderItemWidth;
		this.renderer.setStyle(elementView, 'transform', 'translateX(' + String(-this.sliderCurrentTranslation) + 'px)');
	}

	getMonthName(monthNumber): string {
		return monthNumber >= 0 && monthNumber <= 11 ? this.monthNames[monthNumber] : 'undefined';
	}

	getMonthFirstDay(month: number, year: number): Date {
		return this.dateAdapter.createDate(year, month, 1);
	}

	private getMonthList() {
		let result = new Array();
		let tmpDate = this.dateAdapter.clone(this.startDate);
		while (tmpDate <= this.finishDate) {
			result.push({month: tmpDate.getMonth(), year: tmpDate.getFullYear()});
			tmpDate = this.dateAdapter.addCalendarMonths(tmpDate, 1)
		}
		return result;
	}

	prevDay(date: Date) {
		let d = new Date(date);
		let lastVal = new Date(date);
		d.setDate(d.getDate() - 1);
		if (d >= this.fromDate) {
			let ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			let element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.remove('c-h21-two-month-calendar_selected');
			element.classList.remove('c-h21-two-month-calendar_selected__finish');
			element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');

			date.setDate(date.getDate() - 1);
			ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.add('c-h21-two-month-calendar_selected');
			element.classList.add(date == this.selectedToDate ? 'c-h21-two-month-calendar_selected__finish' : 'c-h21-two-month-calendar_selected__start');

			if(this.selectedToDate &&
			   this.selectedToDate.getMonth() == this.selectedFromDate.getMonth() &&
			   this.selectedToDate.getDate() == this.selectedFromDate.getDate()) {
				this.clearSelection();
				return;
			}

			if (this.selectedToDate) {
				this.refreshRange(this.selectedToDate);
				this.selectedToDate = new Date(this.selectedToDate);
				this.onReturnDateChanged.emit(this.selectedToDate)
			}
			this.selectedFromDate = new Date(this.selectedFromDate);
			this.onArrivalDateChanged.emit(this.selectedFromDate);

			if (lastVal.getMonth() > date.getMonth()) {
				this.prevSlide();
			}
		}
	}

	nextDay(date: Date) {
		let d = new Date(date);
		let lastVal = new Date(date);
		d.setDate(d.getDate() + 1);
		if (d <= this.toDate) {
			let ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			let element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.remove('c-h21-two-month-calendar_selected');
			element.classList.remove('c-h21-two-month-calendar_selected__finish');
			element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');

			date.setDate(date.getDate() + 1);
			ariaLabel = this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
			element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
			element.classList.add('c-h21-two-month-calendar_selected');
			element.classList.add(date == this.selectedToDate ? 'c-h21-two-month-calendar_selected__finish' : 'c-h21-two-month-calendar_selected__start');

			if(this.selectedToDate.getMonth() == this.selectedFromDate.getMonth() &&
			   this.selectedToDate.getDate() == this.selectedFromDate.getDate()) {
				this.clearSelection();
				return;
			}

			if (this.selectedToDate) {
				this.refreshRange(this.selectedToDate);
				this.selectedToDate = new Date(this.selectedToDate);
				this.onReturnDateChanged.emit(this.selectedToDate)
			}
			this.selectedFromDate = new Date(this.selectedFromDate);
			this.onArrivalDateChanged.emit(this.selectedFromDate);

			if (lastVal.getMonth() < date.getMonth()) {
				this.nextSlide();
			}
		}
	}

	selectedDateChange($event): void {
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
			this.onArrivalDateChanged.emit(this.selectedFromDate);
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
			this.onArrivalDateChanged.emit(this.selectedFromDate);
		} else {
			if (this.selectedToDate) {
				let ariaLabel = this.getMonthName(this.selectedToDate.getMonth()) + ' ' + this.selectedToDate.getDate() + ', ' + this.selectedToDate.getFullYear();
				const element = document.querySelectorAll("[aria-label='" + ariaLabel + "']")[0];
				element.classList.remove('c-h21-two-month-calendar_selected');
				element.classList.remove('c-h21-two-month-calendar_selected__finish');
				element.classList.remove('c-h21-two-month-calendar_range-highlight__finish');
			}
			this.selectedToDate = $event;
			this.onReturnDateChanged.emit(this.selectedToDate);
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
		this.onArrivalDateChanged.emit(this.selectedFromDate);
		this.onReturnDateChanged.emit(this.selectedToDate);

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
		/*if (this.monthList.length != 2) {
			this.monthList = this.getMonthList().slice(0,2);
		}*/

		this.trigger.openMenu();
		this.init();
		let elements = document.querySelectorAll(".c-h21-two-month-calendar");
		if (elements && elements.length > 1) {
			let el = elements[0];
			el.parentElement.removeChild(el);
		}
		/*setTimeout(()=> {
			this.monthList = this.getMonthList();
			setTimeout(()=>{
				this.init()
			}, 0);
			}, 1000);*/
	}


}
