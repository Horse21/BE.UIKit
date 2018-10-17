import {Component, EventEmitter, Input, Output} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IHotelSearchOptions} from "../../dto/i-hotel-search-options";
import {ISortingParameter} from "./../../dto/i-sorting-parameter";
import {VocabularyService} from "../../services/vocabulary-service";
import {IHotelInfo} from "../../dto/i-hotel-info";
import {FormControl} from "@angular/forms";
import {H21HotelFilterPanelViewMode} from "../h21-hotel-filter-panel/h21-hotel-filter-panel-view-mode.enum";

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

	@Input() viewMode: H21HotelFilterPanelViewMode;
	@Output() onSearchResultReady: EventEmitter<IHotelInfo[]>;

	searchInProgress: boolean;
	searchResultReady: boolean;
	showFakeResult: boolean;
	searchResult: Array<IHotelInfo>;
	sortParameters: Array<ISortingParameter>;
	searchResultSortControl: FormControl = new FormControl();
	favoritesSortControl: FormControl = new FormControl();
	negotiatedSortControl: FormControl = new FormControl();

	constructor (private _vocabulary: VocabularyService) {
		this.init();
	}

	init() {
		this.viewMode = H21HotelFilterPanelViewMode.List;
		this.onSearchResultReady = new EventEmitter<IHotelInfo[]>();
		this.searchInProgress = false;
		this.searchResultReady = false;
		this.showFakeResult = false;
		this.sortParameters = [
			{ alias: 'price_up', name: 'Price', direction: 'up'},
			{ alias: 'price_down', name: 'Price', direction: 'down'},
			{ alias: 'popularity_up', name: 'Popularity', direction: 'up'},
			{ alias: 'popularity_down', name: 'Popularity', direction: 'down'},
		];
	}

	search(options: IHotelSearchOptions): void {
		this.searchInProgress = true;
		this.showFakeResult = true;
		this.searchResultReady = false;
		setTimeout(() => {
			this._vocabulary.searchHotels(options).subscribe(result => {
				this.searchInProgress = false;
				this.showFakeResult = false;
				this.searchResult = result;
			});
			setTimeout(() => {
				this.searchResultReady = true;
				this.onSearchResultReady.emit(this.searchResult);
			}, 250);
		}, 2000);
	}

	clear(): void {
		this.searchInProgress = true;
		this.showFakeResult = true;
		this.searchResultReady = false;
		this.searchResult = [];
	}
}
