import { Component } from "@angular/core";
import { FlightItemGroup } from '../../dto/flight-item-group';
import { SearchResult } from '../../dto/search-result';

@Component ({
	selector: "h21-search-result",
	templateUrl: "./h21-search-result.component.html",
})

export class H21SearchResultComponent {

	recommended: FlightItemGroup[];
	cheapest: FlightItemGroup[];
	shortest: FlightItemGroup[];

	setResult(result: SearchResult) {
		setTimeout(()=>{
			if (result.groups) {
				this.recommended = result.groups;
				this.cheapest = result.groups.map(x => x)
					.sort((a, b) => a.price - b.price);
				this.shortest = result.groups.map(x => x)
					.sort((a, b) => a.totalElapsedTime - b.totalElapsedTime);
			} else {
				this.recommended = [];
				this.cheapest = [];
				this.shortest = [];
			}
		});
	}

	getTimeString(groups: FlightItemGroup[]): string {
		if (!groups || groups.length == 0) {
			return "";
		}
		let group = groups[0];
		let result = "";
		let h = Math.floor(group.totalElapsedTime / 60);
		if (h && h > 0) {
			result = h + "h ";
		}
		let m = group.totalElapsedTime % 60;
		if (m && m > 0) {
			result += m + "m ";
		}
		return result.trim();
	}
}
