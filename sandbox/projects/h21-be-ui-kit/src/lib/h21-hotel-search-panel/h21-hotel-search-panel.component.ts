import {IDestinationItem} from './../../dto/i-destination-item';
import {HttpClientService} from "../../services/http-client.service";
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {H21RightOverlayPanelService} from '../h21-right-overlay-panel/h21-right-overlay-panel.service';
import {IHotelSearchOptions} from '../../dto/i-hotel-search-options';
import {H21TwoMonthCalendarComponent} from '../h21-two-month-calendar/h21-two-month-calendar.component';
import {Observable} from "rxjs/index";
import {startWith, map } from "rxjs/internal/operators";

const PREFERRED_CLASS: string[] = [
	'Economy',
	'Premium economy',
	'Business',
	'First class'
];

@Component({
	selector: 'h21-hotel-search-panel',
	templateUrl: './h21-hotel-search-panel.component.html'
})

export class H21HotelSearchPanelComponent {

	@Input() searchMode: 'hotel' | 'room' = 'hotel';
	@Output() onSearch: EventEmitter<IHotelSearchOptions> = new EventEmitter<IHotelSearchOptions>();
	@Output() onClearSearch: EventEmitter<void> = new EventEmitter<void>();

	destinationControl: FormControl = new FormControl('', [Validators.required]);
	nationalityControl: FormControl = new FormControl('', [Validators.required]);
	poiControl: FormControl = new FormControl('', [Validators.required]);
	@ViewChild('calendar') calendarControl: H21TwoMonthCalendarComponent;

	selectedDestinationId: number = 0;
	@Input() destinationList: IDestinationItem[];
	@Input() destinationListUrl: string;
	destinationListFiltered: Observable<IDestinationItem[]>;

	searchOptions: IHotelSearchOptions;
	adultsCount: number = 1;
	childrenCount: number = 0;
	childAge_1: number = null;
	childAge_2: number = null;
	childAgeFakeArray: Array<any> = new Array(18);
	preferredClass: string[] = PREFERRED_CLASS;
	paymentMethod: 'account' | 'hotel' = 'account';
	destination: string = '';
	nationality: string = '';
	checkInDate: Date = null;
	checkOutDate: Date = null;
	nightsCount: number = 0;
	roomsCount: number = 1;
	roomsType: string[];

	constructor(private _rightPanelDialog: H21RightOverlayPanelService,
				private _httpClientService: HttpClientService) {
		this.roomsType = [ this.preferredClass ? this.preferredClass[0] : '' ];
	}

	ngOnInit(): void {
		if(!this.destinationList && this.destinationListUrl) {
			this.fillDestinationList();
		}
		this.destinationListFiltered = this.destinationControl.valueChanges.pipe(
			startWith(''),
			map(value => this._destinationFilter(value)));
	}

	changeCheckInDate($event) {
		this.checkInDate = $event;
		this.setNightsCount();
	}

	changeCheckOutDate($event) {
		this.checkOutDate = $event;
		this.setNightsCount();
	}

	setNightsCount() {
		if (this.checkInDate && this.checkOutDate) {
			const oneDayTime = 86400000; // let oneDayTime = 24 * 60 * 60 * 1000;
			let diffTime = this.checkOutDate.getTime() - this.checkInDate.getTime();
			this.nightsCount = diffTime / oneDayTime;
		} else {
			this.nightsCount = null;
		}
	}

	changeAdultsCount(count: number): void {
		if (count < this.adultsCount) {
			this.showTravelers();
		} else {
			this.adultsCount = count;
		}
	}

	changeRoomsCount(count: number): void {
		this.roomsCount = count;
		if (this.roomsType.length < count) {
			while(this.roomsType.length < count) {
				this.roomsType.push(this.preferredClass ? this.preferredClass[0] : '');
			}
		} else {
			while(this.roomsType.length > count) {
				this.roomsType.pop();
			}
		}
	}

	addTraveler(): void {
		this._rightPanelDialog.open('h21-selected-passengers');
	}

	showTravelers(): void {
		this._rightPanelDialog.open('h21-selected-passengers');
	}

	fillDestinationList(): void {
		this._httpClientService.get(this.destinationListUrl, { withCredentials: false }).subscribe(
			(data) => (this.destinationList = data as IDestinationItem[]),
			(error) => console.log('[FETCHING] Error', error));
	}

	private _destinationFilter(value: string): IDestinationItem[] {
		this.clearDestination();
		if (value.length > 2) {
			const filterValue = value.toString().toLowerCase();
			return this.destinationList.filter(item => item.name.toLowerCase().includes(filterValue));
		}
		return [];
	}

	selectDestination(id: number): void {
		this.selectedDestinationId = id;
	}

	clearDestination(): void {
		this.selectedDestinationId = 0;
	}

	clearSearch() {
		this.destinationControl.setValue('');
		this.paymentMethod = 'account';
		this.destination = '';
		this.nationality = '';
		this.checkInDate = null;
		this.checkOutDate = null;
		this.nightsCount = 0;
		this.roomsCount = 1;
		this.roomsType = [this.preferredClass ? this.preferredClass[0] : ''];
		this.adultsCount = 1;
		this.childrenCount = 0;
		this.childAge_1 = null;
		this.childAge_2 = null;
		this.nationalityControl.setValue('');
		this.poiControl.setValue('');
		this.destinationControl.markAsUntouched();
		this.nationalityControl.markAsUntouched();
		this.poiControl.markAsUntouched();
		this.calendarControl.clear();

		this.onClearSearch.emit();
	}

	search(): void {
		this.destinationControl.updateValueAndValidity();
		this.nationalityControl.updateValueAndValidity();
		this.poiControl.updateValueAndValidity();
		this.calendarControl.validate();
		this.destinationControl.markAsTouched();
		this.nationalityControl.markAsTouched();
		this.poiControl.markAsTouched();

		if (this.destinationControl.invalid
			|| this.nationalityControl.invalid
			|| this.poiControl.invalid
			|| this.calendarControl.invalid) {
			return;
		}

		this.onSearch.emit({
				paymentMethod: this.paymentMethod,
				destination: this.destinationControl.value,
				nationality: this.nationalityControl.value,
				poi: this.poiControl.value,
				checkInDate: this.checkInDate,
				checkOutDate: this.checkOutDate,
				nightsCount: this.nightsCount,
				roomsCount: this.roomsCount,
				roomsType: this.roomsType
			});
	}
}
