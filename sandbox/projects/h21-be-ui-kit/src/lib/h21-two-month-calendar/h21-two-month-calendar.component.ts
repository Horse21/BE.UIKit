import { Component, ViewChild, Input, Output, EventEmitter, Inject, ElementRef, Renderer2 } from "@angular/core";
import { MatCalendar } from "@angular/material";
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

@Component ({
	selector: 'h21-two-month-calendar',
	templateUrl: './h21-two-month-calendar.component.html'
})

export class H21TwoMonthCalendarComponent {
	@Input() rangeSelectMode: boolean = true;
	@Input() fromDate: Date;
	@Input() toDate: Date;
	@Output() selectedDate: EventEmitter<Date> = new EventEmitter();

	@ViewChild('twcSliderItemsBox') elementView: ElementRef;
	@ViewChild('MatCalendar') calendar: MatCalendar<Date>;

	constructor (
		private renderer: Renderer2,
		@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
		private dateAdapter: DateAdapter<Date>
	) {
		this.todayDate = this.dateAdapter.today();
		console.log(this.todayDate);
	}

	todayDate: Date;
	// startDates: Date[] = [];
	// finishDates: Date[] = [];

	test = new Date(2018, 6, 25);

	sliderItemsCount = 7;
	sliderItemsBoxWidth = 0;
	sliderItemWidth = 0;
	sliderCurrentIndex = 0;
	sliderCurrentTranslation = 0;

	ngAfterViewInit() {
		this.sliderItemsBoxWidth = this.elementView.nativeElement.clientWidth;
		this.sliderItemWidth = this.sliderItemsBoxWidth / this.sliderItemsCount;
	}

	prevSlide() {
		this.sliderCurrentIndex--;
		this.moveSlide();
	}

	nextSlide() {
		this.sliderCurrentIndex++;
		this.moveSlide();
	}

	moveSlide() {
		this.sliderCurrentTranslation = this.sliderCurrentIndex * this.sliderItemWidth;
		this.renderer.setStyle(this.elementView.nativeElement, 'transform', 'translateX(' + String( -this.sliderCurrentTranslation ) + 'px)');
	}

	getMinDate(i) {
		let monthBegin = new Date(2018, i-1, 1);
		return monthBegin; // > this.todayDate ? this.todayDate : monthBegin;
	}

	getCalendarList() {
		var arr = new Array<number>();
		let date = this.fromDate;
		while (date < this.toDate) {
			//arr.push(this.dateAdapter.getMonth());
		}
	}
}
