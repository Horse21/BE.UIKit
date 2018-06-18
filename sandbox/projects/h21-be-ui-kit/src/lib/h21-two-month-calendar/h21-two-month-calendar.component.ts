import { Component, ViewChild, Input, Output, EventEmitter, Inject, ElementRef } from "@angular/core";
//import { MatCalendar } from "@angular/material";
//import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component ({
	selector: 'h21-two-month-calendar',
	templateUrl: './h21-two-month-calendar.component.html',
	animations: [
		trigger('sliderMove', [
			state('staic', style({transform: 'translateX(0)'})),
			state('movePrev', style({transform: 'translateX(0)'})),
			state('moveNext',style({transform: 'translateX(0)'})),
			transition('* => *', animate('120ms')),
		])
	]
})

export class H21TwoMonthCalendarComponent {
	@Input() rangeSelectMode: boolean = true;
	@Input() fromDate: Date;
	@Input() toDate: Date;
	@Output() selectedDate: EventEmitter<Date> = new EventEmitter();

	@ViewChild('twcSliderItemsBox') elementView: ElementRef;

	constructor () {

	}
	// constructor (
	// 	@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
	// 	private _adapter: DateAdapter<Date>
	// ) {
    //
	// }

	sliderItemsCount = 12;
	sliderItemsBoxWidth = 0;
	sliderItemWidth = 0;
	sliderCurrentTranslation = 0;

	ngAfterViewInit() {
		this.sliderItemsBoxWidth = this.elementView.nativeElement.clientWidth;
		this.sliderItemWidth = this.sliderItemsBoxWidth / this.sliderItemsCount;
	}

	prevSlide() {
		this.sliderCurrentTranslation -= this.sliderItemWidth;

	}

	nextSlide() {
		this.sliderCurrentTranslation += this.sliderItemWidth;

	}
}
