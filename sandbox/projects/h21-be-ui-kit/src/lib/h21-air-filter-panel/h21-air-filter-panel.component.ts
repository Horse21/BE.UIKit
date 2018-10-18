import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SearchFlightDto} from '../../dto/search-flight-dto';
import {H21AirFilterPanelViewMode} from "../h21-air-filter-panel/h21-air-filter-panel-view-mode.enum";

@Component({
  selector: 'h21-air-filter-panel',
  templateUrl: './h21-air-filter-panel.component.html',
})

export class H21AirFilterPanelComponent {

	@Input() searchOptions: SearchFlightDto;
	@Input() viewMode: H21AirFilterPanelViewMode;
	@Output() onChangeViewMode : EventEmitter<H21AirFilterPanelViewMode>;

	priceSliderConfig: any;
	matExpansionPanelHeaderDefaultHeight: string;
	minPrice: number;
	maxPrice: number;
	currencyName: string;

	constructor() {
		this.init();
	}

	init() {
		this.matExpansionPanelHeaderDefaultHeight = '44px';
		this.minPrice = 1;
		this.maxPrice = 5000;
		this.currencyName = 'EUR';
		this.viewMode = H21AirFilterPanelViewMode.List;
		this.onChangeViewMode = new EventEmitter<H21AirFilterPanelViewMode>();
		this.priceSliderConfig = {
			behaviour: 'drag',
			connect: true,
			start: [250, 750],
			step: 1,
			tooltips: [ true, true ],
			range: {
				min: this.minPrice,
				max: this.maxPrice
			}
		};
	}

	changeViewMode(mode: H21AirFilterPanelViewMode): void {
		this.onChangeViewMode.emit(mode);
	}
}
