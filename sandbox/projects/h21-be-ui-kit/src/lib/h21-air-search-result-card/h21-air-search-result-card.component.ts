import {Component, Input} from '@angular/core';
import {FlightItem} from '../../dto/flight-item';
import {FlightItemGroup} from '../../dto/flight-item-group';

@Component({
	selector: "h21-air-search-result-card",
	templateUrl: "./h21-air-search-result-card.component.html"
})

export class H21AirSearchResultCardComponent {

	@Input() data: FlightItemGroup;

	getTimeString(item: FlightItem): string {
		let result = "";
		let h = Math.floor(item.elapsedTime / 60);
		if (h && h > 0) {
			result = h + "h ";
		}
		let m = item.elapsedTime % 60;
		if (m && m > 0) {
			result += m + "m ";
		}
		if (item.transfers) {
			if (item.transfers.length == 1) {
				result += "(1 stop)";
			} else {
				result += "(" + item.transfers.length + " stops)";
			}
		}
		return result.trim();
	}
}
