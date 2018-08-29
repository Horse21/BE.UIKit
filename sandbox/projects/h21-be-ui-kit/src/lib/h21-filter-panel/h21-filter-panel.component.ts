import { Component, Input } from '@angular/core';
import { SearchFlightDto } from '../../dto/search-flight-dto';

@Component({
  selector: 'h21-filter-panel',
  templateUrl: './h21-filter-panel.component.html',
})

export class H21FilterPanelComponent {

	matExpansionPanelHeaderDefaultHeight = '44px';

	minPrice = 1;
	maxPrice = 5000;
	currencyName = 'EUR';
	@Input() searchOptions: SearchFlightDto

	priceSliderConfig: any = {
		behaviour: 'drag',
		connect: true,
		start: [250, 750],
		step: 1,
		tooltips: [ true, true ],
		range: {
			min: this.minPrice,
			max: this.maxPrice
		},
	};

	onChange($event) {
		this.searchOptions.priceFrom = $event[0];
		this.searchOptions.priceTo = $event[1];
	}
}
