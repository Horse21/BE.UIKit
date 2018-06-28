import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { VocabularyService } from '../../services/vocabulary-service';
import { Passenger } from '../../dto/passenger';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { MatSnackBar } from "@angular/material"

@Component ({
	selector: 'h21-passengers-search',
	templateUrl: './h21-passengers-search.component.html'
})

export class H21PassengersSearchComponent implements OnInit {
	constructor(
		private _appSubscriber: AppSubscriberService,
		public snackBar: MatSnackBar,
		private _vocabulary: VocabularyService,
		private _orderService: OrderService
	) {
	}

	passengers: Passenger[] = [];
	@Input() onlySelected = false;

	public ngOnInit(): void {
		if (this.onlySelected) {
			var selectedPassengers = this._orderService.getPassengers();
			console.log(selectedPassengers)
			this.passengers = selectedPassengers.map(x => x);
		}
	}

	selectTraveler(passenger: Passenger) {
		passenger.listState = 'selected';
		this._appSubscriber.addTraveler(passenger);
		this._orderService.addPassenger(passenger);

		this.snackBar.open('Traveler has ben added', '', {
			duration: 1000,
			panelClass: 'c-h21-passengers-search_snackbar'
		});
	}

	search(searchPattern: string) {
		this.onlySelected = false;
		this._vocabulary.searchPassengers(searchPattern)
			.subscribe(data => {
				var selectedPassengers = this._orderService.getPassengers();
				data.forEach(item => {
					if (selectedPassengers.find(x => x.id == item.id)) {
						item.listState = 'selected';
					}
				});
				this.passengers = data;
			});
	}

	removePassenger(passenger: Passenger) {
		if (passenger.listState == 'confirm') {
			passenger.listState = null;
			this._appSubscriber.removeTraveler(passenger);
			this._orderService.removePassenger(passenger.id);
			if (this.onlySelected) {
				this.passengers = this.passengers.filter(x => x.id != passenger.id);
			}
		}
		else {
			var selectedPassengers = this._orderService.getPassengers();
			if (selectedPassengers.length == 1 && passenger.firstName == 'no name') {
				this.snackBar.open('Traveler can not been removed', '', {
					duration: 1000,
					panelClass: 'c-h21-passengers-error_snackbar'
				});
			} else {
				passenger.listState = 'confirm';
			}
		}
	}

	onMouseLeave(passenger: Passenger) {
		if (passenger.listState == 'confirm') {
			passenger.listState = 'selected';
		}
	}
}
