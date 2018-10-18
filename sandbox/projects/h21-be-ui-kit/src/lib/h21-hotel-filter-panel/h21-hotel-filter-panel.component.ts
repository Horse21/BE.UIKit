import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {IHotelFilterOptions} from "../../dto/i-hotel-filter-options";
import {H21HotelFilterPanelViewMode} from "./h21-hotel-filter-panel-view-mode.enum";

@Component({
	selector: 'h21-hotel-filter-panel',
	templateUrl: './h21-hotel-filter-panel.component.html'
})

export class H21HotelFilterPanelComponent {

	@Input() viewMode: H21HotelFilterPanelViewMode;
	@Output() onChangeViewMode : EventEmitter<string>;
	allTags: string[];
	selectedTags: string[];
	tagsSearchControl: FormControl;
	matExpansionPanelHeaderDefaultHeight: string;
	minPrice: number;
	maxPrice: number;
	currencyName: string;
	priceSliderConfig: any;

	constructor() {
		this.init();
	}

	init() {
		const ALL_TAGS: string[] = [
			'Disabled guest',
			'Breakfast',
			'Room service',
			'Non-smoking rooms',
			'Swimming pool',
			'Bar',
			'WiFi available in all areas',
		];

		this.onChangeViewMode = new EventEmitter<string>();
		this.tagsSearchControl = new FormControl();
		this.allTags = ALL_TAGS;
		this.selectedTags = ALL_TAGS.slice(0, ALL_TAGS.length);
		this.viewMode = H21HotelFilterPanelViewMode.List;
		this.matExpansionPanelHeaderDefaultHeight = '44px';
		this.minPrice = 1;
		this.maxPrice = 5000;
		this.currencyName = 'EUR';
		this.priceSliderConfig = {
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

	addTag(event: MatAutocompleteSelectedEvent): void {
		let index = this.allTags.findIndex((item) => { return item == event.option.viewValue; });
		this.selectedTags.push(this.allTags[index]);
	}

	removeTag(index: number): void {
		this.selectedTags.splice(index, 1);
	}

	changeViewMode(mode: string): void {
		this.onChangeViewMode.emit(mode);
	}
}
