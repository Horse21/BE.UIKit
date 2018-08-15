import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DateAdapter} from '@angular/material';
import {H21RightOverlayPanelService} from "../h21-right-overlay-panel/h21-right-overlay-panel.service";

const DESTINATION_ARR: Array<any> = [
	{id: 1, type: "city", name: "Amsterdam", description: "Netherlands"},
	{id: 2, type: "airport", name: "Amsterdam", description: "Central Station"},
	{id: 3, type: "station", name: "Amsterdam", description: "(AMS-Schiphol)"},
	{id: 4, type: "building", name: "Amsterdam", description: "Court Hotel, New York, NY"},
	{id: 5, type: "building", name: "Amsterdam", description: "City Centre"},
];

@Component({
	selector: 'h21-hotels-search-panel',
	templateUrl: './h21-hotels-search-panel.component.html'
})

export class H21HotelsSearchPanelComponent {

	paymentMethod: 'account' | 'hotel' = 'account';
	destination: string = "";
	hotelName: string = "";
	nationality: string = "";
	checkInDate: Date;
	checkOutDate: Date;
	nightsCount: number = null;
	adultsCount: number = 1;
	childrenCount: number = 0;
	roomsCount: number = 0;

	childAge_1: number = null;
	childAge_2: number = null;
	childAgeFakeArray: Array<any> = new Array(18);

	destinations: Array<any> = DESTINATION_ARR;
	destinationControl: FormControl = new FormControl();

	constructor(private _dateAdapter: DateAdapter<Date>,
				private _rightPanelDialog: H21RightOverlayPanelService) {

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

}
