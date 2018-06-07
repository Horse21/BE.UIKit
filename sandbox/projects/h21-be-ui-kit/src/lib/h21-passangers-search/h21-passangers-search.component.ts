import { Component, Input, OnInit } from '@angular/core';
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

	selectedTravelers: Passenger[] = [];
	passengers: Observable<Passenger[]>;
	@Input() onlySelected = false;

	public ngOnInit(): void {
		if (this.onlySelected) {
			this.passengers = Observable.create(this._orderService.getPassengers());
		}
	}

	selectTraveler(passenger: Passenger) {
		this.selectedTravelers.push(passenger);
		this._appSubscriber.addTraveler(passenger);

		this.snackBar.open('Traveler has ben added', '', {
			duration: 1000,
			panelClass: 'c-h21-passangers-search_snackbar'
		});
	}

	isSelected(id: string): boolean {
		return this.selectedTravelers.filter(x => x.id == id).length != 0;
	}

	search(searchPattern: string) {
		this.passengers = this._vocabulary.searchPassengers(searchPattern);
	}

	removePassenger(passenger: Passenger) {
		//todo: заменим состояние
		this._appSubscriber.removeTraveler(passenger);
	}


}
