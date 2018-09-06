import {Component} from "@angular/core";

export interface IHistoryCard {
	id: number,
	payment: string,
	destination: string,
	adults: number,
	rooms: number
}

const HISTORY_DATA: Array<IHistoryCard> = [
	{ id: 1, payment: 'Payment on account', destination: 'Amsterdam, Netherlands', adults: 2, rooms: 1 },
	{ id: 2, payment: 'Payment on account', destination: 'Amsterdam, Netherlands', adults: 2, rooms: 1 },
	{ id: 3, payment: 'Payment on account', destination: 'Amsterdam, Netherlands', adults: 2, rooms: 1 },
	{ id: 4, payment: 'Payment on account', destination: 'Amsterdam, Netherlands', adults: 2, rooms: 1 }
];

@Component({
	selector: 'h21-history-panel',
	templateUrl: './h21-history-panel.component.html'
})

export class H21HistoryPanelComponent {

	history: Array<IHistoryCard>;

	constructor() {
		this.history = HISTORY_DATA;
	}
}
