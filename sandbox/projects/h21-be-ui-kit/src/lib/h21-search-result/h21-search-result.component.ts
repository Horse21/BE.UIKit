import { Component } from "@angular/core";
import { FlightItemGroup } from '../../dto/flight-item-group';
import { SearchResult } from '../../dto/search-result';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component ({
	selector: "h21-search-result",
	templateUrl: "./h21-search-result.component.html",
	animations: [
		trigger('toggleVisibility', [
			state('void', style({ opacity: 0 })),
			state('enter', style({ opacity: 1 })),
			state('leave',style({ opacity: 0 })),
			transition('* => *', animate('500ms')),
		])
	]
})

export class H21SearchResultComponent {
	recommended: FlightItemGroup[];
	cheapest: FlightItemGroup[];
	shortest: FlightItemGroup[];
	visibility = false;

	setResult(result: SearchResult) {
		this.recommended = result.groups;
		if (result.groups) {
			this.cheapest = result.groups.map(x => x)
				.sort((a, b) => a.price - b.price);
			this.shortest = result.groups.map(x => x)
				.sort((a, b) => a.totalElapsedTime - b.totalElapsedTime);
		} else {
			this.cheapest = undefined;
			this.shortest = undefined;
		}
	}

	getTimeString(groups: FlightItemGroup[]): string {
		if (!groups) {
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
