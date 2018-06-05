import {Component} from "@angular/core";
import { Traveler } from '../../dto/traveler';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import {MatSnackBar} from "@angular/material"

@Component ({
	selector: 'h21-passangers-search',
	templateUrl: './h21-passangers-search.component.html'
})

export class H21PassangersSearchComponent {
	constructor (private _appSubscriber: AppSubscriberService, public snackBar: MatSnackBar) {}
	selectedTravelers: number[] = [];

	selectTraveler(id: number) {
		this.selectedTravelers.push(id);
		this._appSubscriber.addTraveler(<Traveler>{
			id: id,
			name: 'traveler ' + id
		});

		this.snackBar.open('Traveler has ben added', '', {
			duration: 1000, panelClass: 'c-h21-passangers-search_snackbar'
		});
	}

	isSelected(id: number): boolean {
		return this.selectedTravelers.indexOf(id) != -1;
	}
}
