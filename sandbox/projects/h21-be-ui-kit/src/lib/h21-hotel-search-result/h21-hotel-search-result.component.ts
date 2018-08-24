import {Component, Input} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ISearchHotelOptions} from "./../../dto/i-search-hotel-options";
import {ISortingParameter} from "./../../dto/i-sorting-parameter";

@Component({
	selector: 'h21-hotel-search-result',
	templateUrl: './h21-hotel-search-result.component.html',
	animations: [
		trigger('toggleVisibility', [
			state('void', style({ opacity: 0 })),
			state('enter', style({ opacity: 1 })),
			state('leave',style({ opacity: 0 })),
			transition('* => *', animate('200ms')),
		])
	]
})

export class H21HotelSearchResultComponent {

	@Input() viewMode: 'list' | 'grid' | 'map' = 'list';

	sortParameters: Array<ISortingParameter>;
	searchInProgress: boolean = false;
	searchResultReady: boolean = false;
	showFakeResult: boolean = false;

	constructor () {
		this.sortParameters = [
			{ alias: 'price_up', name: 'Price', direction: 'up'},
			{ alias: 'price_down', name: 'Price', direction: 'down'},
			{ alias: 'popularity_up', name: 'Popularity', direction: 'up'},
			{ alias: 'popularity_down', name: 'Popularity', direction: 'down'},
		];
	}

	search(options: ISearchHotelOptions): void {
		this.searchInProgress = true;
		this.showFakeResult = true;
		this.searchResultReady = false;
		setTimeout(() => {
			this.searchInProgress = false;
			this.showFakeResult = false;
			setTimeout(() => {
				this.searchResultReady = true;
			}, 250);
		}, 2000);
	}

	clear(): void {
		this.searchInProgress = true;
		this.showFakeResult = true;
		this.searchResultReady = false;
	}
}
