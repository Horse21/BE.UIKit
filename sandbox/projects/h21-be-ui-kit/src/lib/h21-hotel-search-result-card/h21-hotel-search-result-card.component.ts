import {Component, Input} from "@angular/core";
import {IHotelInfo} from "../../dto/i-hotel-info";

@Component({
	selector: 'h21-hotel-search-result-card',
	templateUrl: './h21-hotel-search-result-card.component.html',
})

export class H21HotelSearchResultCardComponent {

	@Input() gridMode: boolean = false;
	@Input() data: IHotelInfo;
	currencyCode = 'EUR';

	constructor () {

	}

	openInBook(id: number): void {
		window.open(`./hotelbook/${id}`);
	}
}
