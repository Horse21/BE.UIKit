import { HttpClient } from '@angular/common/http';
import { DestinationLoaderService } from './../../../../../src/services/destination-loader.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { H21RightOverlayPanelService } from '../h21-right-overlay-panel/h21-right-overlay-panel.service';
import { IHotelSearchOptions } from '../../dto/i-hotel-search-options';
import value from '*.json';

// const DESTINATION_ARR: Array<any> = [
// 	{ id: 1, type: 'city', name: 'Amsterdam', description: 'Netherlands' },
// 	{ id: 2, type: 'airport', name: 'Amsterdam', description: 'Central Station' },
// 	{ id: 3, type: 'station', name: 'Amsterdam', description: '(AMS-Schiphol)' },
// 	{ id: 4, type: 'building', name: 'Amsterdam', description: 'Court Hotel, New York, NY' },
// 	{ id: 5, type: 'building', name: 'Fukuoka', description: 'City Centre' },
// 	{ id: 6, type: 'building', name: 'Fukushima', description: 'City Centre' },
// 	{ id: 7, type: 'building', name: 'Fukashinai', description: 'City Centre' },
// 	{ id: 8, type: 'building', name: 'Flick', description: 'City Centre' }
// ];

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
	destinations: Array<any>;
	destinationsFiltered: Array<any>;
	filterStartLettersCount = 3;

	destinationControl: FormControl = new FormControl('', [Validators.required]);
	nationalityControl: FormControl = new FormControl('', [Validators.required]);

	@Input()
	searchMode: 'hotel' | 'room' = 'hotel';

	@Output()
	onSearch: EventEmitter<IHotelSearchOptions> = new EventEmitter<IHotelSearchOptions>();
	@Output()
	onClearSearch: EventEmitter<void> = new EventEmitter<void>();

	constructor(
		private _dateAdapter: DateAdapter<Date>,
		private _rightPanelDialog: H21RightOverlayPanelService,
		private destinationLoader: DestinationLoaderService
	) {
		this.searchOptions = <IHotelSearchOptions>{
			paymentMethod: 'account',
			destination: '',
			hotelName: '',
			nationality: '',
			checkInDate: null,
			checkOutDate: null,
			nightsCount: null,
			roomCount: 0
		};
	}

	ngOnInit(): void {
		this.fetchDestinations();
	}

	fetchDestinations() {
		this.destinationLoader
			.url("https://gist.githubusercontent.com/atthealchemist/8c2f402868bd40f4bf167aea495cc2de/raw/3aa308e229cef0b0ed629e3a2bb878813a722918/destinations.json")
			.getDestinations()
			.subscribe(
				(data) => (this.destinationsFiltered = data),
				(error) => console.log('[FETCHING] Error', error),
				() => console.log('[FETCHING] Successfully fetching destinations', this.destinationsFiltered)
			);
	}

	onDestinationEdited(event) {
		let valueIsEmpty = (!event.target.value || event.target.value === '');
		let valueIsLessThanStartLettersCount = (event.target.value.length < this.filterStartLettersCount);
		let valueIsGreaterThanStartLettersCount = (event.target.value.length >= this.filterStartLettersCount);
		let isLetterRemoved = (event.key === 'Backspace' || event.key === 'Delete');
		let destinationsEmptyOrOne = (this.destinationsFiltered.length <= 1);

		if (valueIsEmpty || valueIsLessThanStartLettersCount || destinationsEmptyOrOne) {
			this.fetchDestinations();
			this.destinations = this.destinationsFiltered;
		} else {
			console.log('[TYPING] onDestinationEdited.event.target.value', event.target.value);
			this.destinations = this.destinationsFiltered.filter((value) => {
				console.log("[TYPING FILTERING] this.destinations");
				return value.name.toLowerCase().startsWith(event.target.value);
			});
			if (isLetterRemoved) {
				console.log('[REMOVING] onDestinationEdited.event.target.value', event.target.value);
				this.destinations = this.destinationsFiltered.filter((value) => {
					let startingLettersOfValue = event.target.value.substr(0, this.filterStartLettersCount - 1);
					console.log("[REMOVING FILTERING] this.destinations");
					return value.name.toLowerCase().startsWith(startingLettersOfValue);
				});
			}
		}
		console.log('onDestinationEdited.destinations', this.destinations);
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
		this.searchOptions.destination = '';
		this.searchOptions.nationality = '';
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
