import {Component, OnInit} from '@angular/core';
import {H21AccountSelectService} from "../h21-accout-select/h21-account-select-service";

@Component({
	selector: 'h21-hotel-reservation',
	templateUrl: './h21-hotel-reservation.component.html',
})

export class H21HotelReservationComponent implements OnInit {

	persons: Array<any>;
	hotelInfo: any;
	paymentMethod: string = '';

	constructor(private _accountSelect: H21AccountSelectService) {

	}

	init(): void {
		this.persons = [
			{firstName: 'Georgy', lastName: 'Zhukov', nationality: 'Russian', country: 'Russia', city: 'Moscow', email: 'marshal@ussr.ru', phone: '+7 (903) 09-05-45'},
			{firstName: '', lastName: '', nationality: '', country: '', city: '', email: '', phone: ''},
			{firstName: '', lastName: '', nationality: '', country: '', city: '', email: '', phone: ''}
		];
		this.hotelInfo = {
			name: 'Pestana Amsterdam Riverside – LVX Preferred Hotels & Resorts',
			country: 'Netherlands',
			city: 'Amsterdam',
			address: 'Amsteldijk 67, Oud Zuid, 1074 HZ Amsterdam, Netherlands',
			singleRoomCount: 1,
			totalPersonCount: 1,
			class: 4,
			checkInDate: '',
			checkOutDate: '',
			roomInformation: 'Signature Studio Suite, 1 Bedroom, Concierge Service',
			rateInformation: 'Included in room price 18% VAT',
			meals: 'Breakfast included',
		};

	}


	changePaymentMethod() {
		this._accountSelect.open();
	}

	ngOnInit() {
		this.init();
	}
}
