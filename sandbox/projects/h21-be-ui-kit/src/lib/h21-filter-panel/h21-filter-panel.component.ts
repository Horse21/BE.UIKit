import {Component} from '@angular/core';

@Component({
  selector: 'h21-filter-panel',
  templateUrl: './h21-filter-panel.component.html',
})

export class H21FilterPanelComponent {

	matExpansionPanelHeaderDefaultHeight = '44px';

	minPrice = 1;
	maxPrice = 1000;
	currencyName = 'EUR';

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
}
