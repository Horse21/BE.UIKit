import { Component, Input } from '@angular/core';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { H21RightOverlayPanelService } from "../h21-right-overlay-panel/h21-right-overlay-panel.service";

@Component({
	selector: 'h21-passangers-select',
	template: `
		<div class="c-h21-passangers-select">
			<button mat-button color="primary" class="c-h21-passangers-select_open-menu-btn" [matMenuTriggerFor]="passangersSelectMenu">
				<mat-icon matPrefix>supervisor_account</mat-icon>
				<span>Adult 1</span>
			</button>
		</div>
		<mat-menu #passangersSelectMenu="matMenu" class="c-h21-passangers-select_menu">
			<ng-template matMenuContent>
				<div (click)="$event.stopPropagation();">
					<span class="c-h21-passangers-select_menu-title">Passengers</span>
					<div class="c-h21-passangers-select_counter">
						<span>Adult(s)</span>
						<div>
							<button mat-icon-button color="primary" [disabled]="adultCount <= 1" (click)="showPassengers();">
								<mat-icon>remove</mat-icon>
							</button>
							<input type="text" value="{{adultCount}}" />
							<button mat-icon-button color="primary" (click)="addPassenger('adult');">
								<mat-icon>add</mat-icon>
							</button>
						</div>
						<button mat-button color="primary" (click)="openOverlayPanel();">
							<mat-icon>person</mat-icon> 
							<span>&times; 1</span>
						</button>
					</div>
					<div class="c-h21-passangers-select_counter">
						<span>Children</span>
						<div>
							<button mat-icon-button color="primary" [disabled]="childrenCount < 1" (click)="showPassengers();">
								<mat-icon>remove</mat-icon>
							</button>
							<input type="text" name="" value="{{childrenCount}}" />
							<button mat-icon-button color="primary" (click)="addPassenger('children');">
								<mat-icon>add</mat-icon>
							</button>
						</div>
					</div>
					<div class="c-h21-passangers-select_counter">
						<span>Infant</span>
						<div>
							<button mat-icon-button color="primary" [disabled]="infantCount < 1" (click)="showPassengers();">
								<mat-icon>remove</mat-icon>
							</button>
							<input type="text" name="" value="{{infantCount}}" />
							<button mat-icon-button color="primary" (click)="addPassenger('infant');">
								<mat-icon>add</mat-icon>
							</button>
						</div>
					</div>
				</div>
			</ng-template>
		</mat-menu>
	`
})

export class H21PassangersSelectComponent {
	@Input() adultCount = 1;
	@Input() childrenCount = 0;
	@Input() infantCount = 0;

	constructor(private rightPanelDialog: H21RightOverlayPanelService,
		appSubscriber: AppSubscriberService) {
		appSubscriber.travelerObservable()
			.subscribe(value => {
				this.addPassenger('adult');
			});
		appSubscriber.removeTravelerObservable()
			.subscribe(value => {
				this.removePassenger('adult');
			});
	}

	addPassenger(passengerType) {
		switch (passengerType) {
			case 'adult' :  this.adultCount += 1;
				break;
			case 'children' : this.childrenCount += 1;
				break;
			case 'infant' : this.infantCount += 1;
				break;
		}
	}

	showPassengers() {
		this.rightPanelDialog.open('h21-selected-passengers');
	}

	removePassenger(passengerType) {
		switch (passengerType) {
			case 'adult' :  this.adultCount -= 1;
				break;
			case 'children' : this.childrenCount -= 1;
				break;
			case 'infant' : this.infantCount -= 1;
				break;
		}
	}

	openOverlayPanel() {
		this.rightPanelDialog.open('h21-search-passengers');
	}
}
