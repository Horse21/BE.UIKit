import {Component} from '@angular/core';
import {H21AccountSelectService} from "../h21-accout-select/h21-account-select-service";
import {H21AccountSelectRef} from "../h21-accout-select/h21-account-select-ref";

@Component({
	selector: 'h21-hotel-reservation',
	templateUrl: './h21-hotel-reservation.component.html',
})

export class H21HotelReservationComponent {

	hotelInfo: any;
	persons: Array<any>;
	paymentMethods: Array<any>;
	selectedPaymentMethodId: number;
	selectedPaymentAccountId: number;
	private dialogRef: H21AccountSelectRef;

	constructor(private _accountSelect: H21AccountSelectService) {
		this.testInit();
	}

	changePaymentMethod(id: number): void {
		this.selectedPaymentMethodId = id;
		let paymentMethod =  this.paymentMethods.find((item) => { return item.id == id; });
		if (paymentMethod.accounts.length > 1) {
			this.dialogRef = this._accountSelect.open(paymentMethod.accounts);
			this.dialogRef.afterClosed().subscribe((data) => {
				this.selectedPaymentAccountId = data.id;
			});
		} else {
			this.selectedPaymentAccountId = paymentMethod.accounts[0].id;
		}
	}

	testInit(): void {

		// Persons data
		this.persons = [
			{firstName: 'Georgy', lastName: 'Zhukov', nationality: 'Russian', country: 'Russia', city: 'Moscow', email: 'marshal@ussr.ru', phone: '+7 (903) 09-05-45'},
			{firstName: '', lastName: '', nationality: '', country: '', city: '', email: '', phone: ''},
			{firstName: '', lastName: '', nationality: '', country: '', city: '', email: '', phone: ''}
		];

		// Hotel data
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

		// Payment methods data
		this.paymentMethods = [
			{id: 1, name: 'AirPlus', accounts: [
					{
						id: 1,
						name: 'my_name--account_1',
						number: '1588777-001',
						expireDate: {
							month: '02 February',
							year: '2020'
						},
						dbi: [
							{ name: 'DBI_AE',  value: ''},
							{ name: 'DBI_AU',  value: ''},
							{ name: 'DBI_BD',  value: ''},
							{ name: 'DBI_KS',  value: ''},
							{ name: 'DBI_RZ',  value: ''},
						]},
					{
						id: 2,
						name: 'my_name--account_2',
						number: '1588777-002',
						expireDate: {
							month: '03 March',
							year: '2021'
						},
						dbi: [
							{ name: 'DBI_AE',  value: ''},
							{ name: 'DBI_AU',  value: ''},
							{ name: 'DBI_BD',  value: ''},
							{ name: 'DBI_KS',  value: ''},
							{ name: 'DBI_RZ',  value: ''},
						]},
					{
						id: 3,
						name: 'my_name--account_3',
						number: '1588777-003',
						expireDate: {
							month: '04 April',
							year: '2022'
						},
						dbi: [
							{ name: 'DBI_AE',  value: ''},
							{ name: 'DBI_AU',  value: ''},
							{ name: 'DBI_BD',  value: ''},
							{ name: 'DBI_KS',  value: ''},
							{ name: 'DBI_RZ',  value: ''},
						]
					},
				]
			},
			{id: 2, name: 'BTA', accounts: [
					{
						id: 4,
						name: 'my_name--account_4',
						number: '1588777-004',
						expireDate: {
							month: '03 March',
							year: '2021'
						},
						dbi: [
							{ name: 'DBI_AE',  value: ''},
							{ name: 'DBI_AU',  value: ''},
							{ name: 'DBI_BD',  value: ''},
							{ name: 'DBI_KS',  value: ''},
							{ name: 'DBI_RZ',  value: ''},
						]
					},
				]
			},
			{id: 3, name: 'Invoice', accounts: [
					{
						id: 5,
						name: 'my_name--account_5',
						number: '1588777-006',
						expireDate: {
							month: '03 March',
							year: '2021'
						},
						dbi: [
							{ name: 'DBI_AE',  value: ''},
							{ name: 'DBI_AU',  value: ''},
							{ name: 'DBI_BD',  value: ''},
							{ name: 'DBI_KS',  value: ''},
							{ name: 'DBI_RZ',  value: ''},
						]
					},
				]
			}
		];
	}
}
