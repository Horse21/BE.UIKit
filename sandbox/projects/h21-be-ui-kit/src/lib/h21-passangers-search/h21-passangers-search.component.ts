import {Component} from "@angular/core";
import { Traveler } from '../../dto/traveler';
import { AppSubscriberService } from '../../services/app-subscriber-service';

@Component ({
	selector: 'h21-passangers-search',
	templateUrl: './h21-passangers-search.component.html'
})

export class H21PassangersSearchComponent {
	constructor (private _appSubscriber: AppSubscriberService) {}
	selectedTravelers: number[] = [];

	selectTraveler(id: number) {
		this.selectedTravelers.push(id);
		this._appSubscriber.addTraveler(<Traveler>{
			id: id,
			name: 'traveler ' + id
		});
	}

	isSelected(id: number): boolean {
		return this.selectedTravelers.indexOf(id) != -1;
	}
}
