import { Component, Input, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs/index';
import { OrderService } from '../../services/order-service';
import { VocabularyService } from '../../services/vocabulary-service';
import { Observable } from 'rxjs/internal/Observable';
import { Passenger } from '../../dto/passenger';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import {MatSnackBar} from "@angular/material"

@Component ({
	selector: 'h21-passangers-search',
	templateUrl: './h21-passangers-search.component.html'
})

export class H21PassangersSearchComponent implements OnInit {
	constructor(
		private _appSubscriber: AppSubscriberService,
		public snackBar: MatSnackBar,
		private _vocabulary: VocabularyService,
		private _orderService: OrderService
	) {
	}

	passengers: Observable<Passenger[]>;
	@Input() onlySelected = false;

	public ngOnInit(): void {
		if (this.onlySelected) {
			var selectedPassengers = this._orderService.getPassengers();
			this.passengers = Observable.create((observer: Subscriber<any>) => {
				observer.next(selectedPassengers);
				observer.complete();
			});
		}
	}

	selectTraveler(passenger: Passenger) {
		passenger.listState = 'selected';
		this._appSubscriber.addTraveler(passenger);
		this._orderService.addPassenger(passenger);

		this.snackBar.open('Traveler has ben added', '', {
			duration: 1000,
			panelClass: 'c-h21-passangers-search_snackbar'
		});
	}

	search(searchPattern: string) {
		this.passengers = this._vocabulary.searchPassengers(searchPattern);
	}

	removePassenger(passenger: Passenger) {
		if (passenger.listState == 'confirm') {
			passenger.listState = null;
			this._appSubscriber.removeTraveler(passenger);
			this._orderService.removePassenger(passenger.id);
		} else {
			passenger.listState = 'confirm';
		}
	}
}
