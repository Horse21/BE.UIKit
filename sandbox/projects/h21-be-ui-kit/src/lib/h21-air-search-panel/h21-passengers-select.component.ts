import { Component, Input } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Passenger } from '../../dto/passenger';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { H21RightOverlayPanelService } from "../h21-right-overlay-panel/h21-right-overlay-panel.service";

@Component({
	selector: 'h21-passengers-select',
	template: `
		<div class="c-h21-passengers-select">
			<button mat-button color="primary" class="c-h21-passengers-select_open-menu-btn" [matMenuTriggerFor]="passengersSelectMenu">
				<mat-icon matPrefix>supervisor_account</mat-icon>
				<span>{{controlText}}</span>
			</button>
		</div>
		<mat-menu #passengersSelectMenu="matMenu" class="c-h21-passengers-select_menu">
			<ng-template matMenuContent>
				<div (click)="$event.stopPropagation();">
					<span class="c-h21-passengers-select_menu-title">Passengers</span>
					<div class="c-h21-passengers-select_counter">
						<span>Adult(s)</span>
						<div>
							<h21-counter [value]="adultCount" 
										 [min]="1" 
										 [max]="99"
										 [reduceOnlyProgrammatically]="true"
										 (onReduce)="showPassengers()"
										 (onChanged)="changeAdultCount($event)"
							></h21-counter>
						</div>
						<button mat-button color="primary" (click)="openOverlayPanel()">
							<mat-icon>person</mat-icon> 
							<span>&times; 1</span>
						</button>
					</div>
					<div class="c-h21-passengers-select_counter">
						<span>Children</span>
						<div>
							<h21-counter [value]="childrenCount" 
										 [min]="0" 
										 [max]="99"
										 [reduceOnlyProgrammatically]="true"
										 (onReduce)="showPassengers()"
										 (onChanged)="changeChildrenCount($event)"
							></h21-counter>
						</div>
					</div>
					<div class="c-h21-passengers-select_counter">
						<span>Infant</span>
						<div>
							<h21-counter [value]="infantCount" 
										 [min]="0" 
										 [max]="99"
										 [reduceOnlyProgrammatically]="true"
										 (onReduce)="showPassengers()"
										 (onChanged)="changeInfantCount($event)"
							></h21-counter>
						</div>
					</div>
				</div>
			</ng-template>
		</mat-menu>
	`
})

export class H21PassengersSelectComponent {

	adultCount: number;
	childrenCount: number;
	infantCount: number;
	controlText: string;

	constructor(private rightPanelDialog: H21RightOverlayPanelService,
				private _appSubscriber: AppSubscriberService,
				private _orderService: OrderService) {
		this.init();
	}

	init(): void {
		this.adultCount = 0;
		this.childrenCount = 0;
		this.infantCount = 0;
		this.addPassenger('adult');
		this.updateControlText();

		this._appSubscriber.travelerObservable()
			.subscribe(passenger => {
				this.incrementPassenger(passenger.type);
			});
		this._appSubscriber.removeTravelerObservable()
			.subscribe(passenger => {
				this.decrementPassenger(passenger.type);
			});
	}

	addPassenger(passengerType: 'adult' | 'children' | 'infant') {
		let firstName = '';
		switch(passengerType) {
			case 'adult' :
				firstName = 'No name adult';
				break;
			case 'children' :
				firstName = 'No name child';
				break;
			case 'infant' :
				firstName = 'No name infant';
				break;
		}
		const passenger = <Passenger>{
			listState: 'selected',
			firstName: firstName,
			type: passengerType
		};
		this._orderService.addPassenger(passenger);
		this.incrementPassenger(passenger.type);
	}

	incrementPassenger(passengerType: 'adult' | 'children' | 'infant'): void {
		switch (passengerType) {
			case 'adult' :
				this.adultCount += 1;
				break;
			case 'children' :
				this.childrenCount += 1;
				break;
			case 'infant' :
				this.infantCount += 1;
				break;
		}
		this.updateControlText();
	}

	decrementPassenger(passengerType: 'adult' | 'children' | 'infant'): void {
		switch (passengerType) {
			case 'adult' :
				this.adultCount -= 1;
				break;
			case 'children' :
				this.childrenCount -= 1;
				break;
			case 'infant' :
				this.infantCount -= 1;
				break;
		}
		this.updateControlText();
	}

	changeAdultCount($event: number): void {
		if (this.adultCount < $event) {
			this.addPassenger('adult');
		}
	}

	changeChildrenCount($event: number): void {
		if (this.childrenCount < $event) {
			this.addPassenger('children');
		}
	}

	changeInfantCount($event: number): void {
		if (this.infantCount < $event) {
			this.addPassenger('infant');
		}
	}

	updateControlText(): void {
		let label = 'passenger(s)';
		if (!this.childrenCount && !this.infantCount) {
			label = 'adult(s)';
		}
		let count = this.adultCount + this.childrenCount + this.infantCount;
		this.controlText = `${count} ${label}`;
	}

	showPassengers() {
		this.rightPanelDialog.open('h21-selected-passengers');
	}

	openOverlayPanel() {
		this.rightPanelDialog.open('h21-search-passengers');
	}
}
