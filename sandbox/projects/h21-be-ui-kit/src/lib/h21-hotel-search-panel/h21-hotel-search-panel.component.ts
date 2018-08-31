import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DateAdapter} from '@angular/material';
import {H21RightOverlayPanelService} from "../h21-right-overlay-panel/h21-right-overlay-panel.service";
import {IHotelSearchOptions} from "../../dto/i-hotel-search-options";

const DESTINATION_ARR: Array<any> = [
	{id: 1, type: "city", name: "Amsterdam", description: "Netherlands"},
	{id: 2, type: "airport", name: "Amsterdam", description: "Central Station"},
	{id: 3, type: "station", name: "Amsterdam", description: "(AMS-Schiphol)"},
	{id: 4, type: "building", name: "Amsterdam", description: "Court Hotel, New York, NY"},
	{id: 5, type: "building", name: "Amsterdam", description: "City Centre"},
];

@Component({
	selector: 'h21-hotel-search-panel',
	templateUrl: './h21-hotel-search-panel.component.html'
})

export class H21HotelSearchPanelComponent {

	searchOptions: IHotelSearchOptions;
	adultsCount: number = 1;
	childrenCount: number = 0;
	childAge_1: number = null;
	childAge_2: number = null;
	childAgeFakeArray: Array<any> = new Array(18);
	destinations: Array<any> = DESTINATION_ARR;
	destinationControl: FormControl = new FormControl();

	@Output() onSearch: EventEmitter<IHotelSearchOptions> = new EventEmitter<IHotelSearchOptions>();
	@Output() onClearSearch: EventEmitter<void> = new EventEmitter<void>();

	constructor(private _dateAdapter: DateAdapter<Date>,
				private _rightPanelDialog: H21RightOverlayPanelService) {

		this.searchOptions = <IHotelSearchOptions> {
			paymentMethod: 'account',
			destination: "",
			hotelName: "",
			nationality: "",
			checkInDate: null,
			checkOutDate: null,
			nightsCount: null,
			roomCount: 0
		};
	}

	changeCheckInDate($event) {
		this.searchOptions.checkInDate = $event;
		this.setNightsCount();
	}

	changeCheckOutDate($event) {
		this.searchOptions.checkOutDate = $event;
		this.setNightsCount();
	}

	setNightsCount() {
		if (this.searchOptions.checkInDate && this.searchOptions.checkOutDate) {
			const oneDayTime = 86400000; // let oneDayTime = 24 * 60 * 60 * 1000;
			let diffTime = this.searchOptions.checkOutDate.getTime() - this.searchOptions.checkInDate.getTime();
			this.searchOptions.nightsCount = diffTime / oneDayTime;
		} else {
			this.searchOptions.nightsCount = null;
		}
	}

	changeAdultsCount($event) {
		if ($event < this.adultsCount) {
			this.showTravelers();
		} else {
			this.adultsCount = $event;
		}
	}

	addTraveler() {
		this._rightPanelDialog.open('h21-selected-passengers');
	}

	showTravelers() {
		this._rightPanelDialog.open('h21-selected-passengers');
	}

	clearSearch() {
		this.searchOptions.paymentMethod = 'account';
		this.searchOptions.destination = "";
		this.searchOptions.nationality = "";
		this.searchOptions.checkInDate = null;
		this.searchOptions.checkOutDate = null;
		this.searchOptions.nightsCount = null;
		this.searchOptions.roomCount = 0;

		this.onClearSearch.emit();
	}

	search() {
		this.onSearch.emit(this.searchOptions);
	}

}
