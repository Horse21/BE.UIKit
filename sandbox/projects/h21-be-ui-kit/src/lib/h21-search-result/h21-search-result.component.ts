import {Component} from "@angular/core";
import { FlightItemGroup } from '../../dto/flight-item-group';
import { SearchResult } from '../../dto/search-result';

@Component ({
	selector: "h21-search-result",
	templateUrl: "./h21-search-result.component.html"
})

export class H21SearchResultComponent {
	sortParameter = "price";
	result: SearchResult = new SearchResult();

	getCheapest(groups: FlightItemGroup[]) {
		if(!groups)
			return undefined;
		return groups.sort(x => x.price);
	}

	getShortest(groups: FlightItemGroup[]) {
		if(!groups)
			return undefined;
		return groups;
	}
}
