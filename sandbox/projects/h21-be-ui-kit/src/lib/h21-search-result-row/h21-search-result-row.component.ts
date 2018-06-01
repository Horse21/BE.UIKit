import { Component, Input } from '@angular/core';
import { FlightItemGroup } from '../../dto/flight-item-group';

@Component ({
	selector: "h21-search-result-row",
	templateUrl: "./h21-search-result-row.component.html"
})

export class H21SearchResultRowComponent {
	@Input() group: FlightItemGroup;
}
