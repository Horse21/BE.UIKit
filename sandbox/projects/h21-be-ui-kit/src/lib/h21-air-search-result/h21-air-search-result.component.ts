import {Component, EventEmitter, Output} from "@angular/core";
import {FlightItemGroup} from '../../dto/flight-item-group';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {VocabularyService} from "../../services/vocabulary-service";
import {SearchFlightDto} from "../../dto";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component ({
	selector: "h21-air-search-result",
	templateUrl: "./h21-air-search-result.component.html",
	viewProviders: [MatIconRegistry],
	animations: [
		trigger('toggleVisibility', [
			state('void', style({ opacity: 0 })),
			state('enter', style({ opacity: 1 })),
			state('leave',style({ opacity: 0 })),
			transition('* => *', animate('200ms')),
		])
	]
})

export class H21AirSearchResultComponent {

	@Output() onSearchResultReady: EventEmitter<FlightItemGroup[]> = new EventEmitter<FlightItemGroup[]>();
	searchInProgress: boolean;
	searchResultReady: boolean;
	showFakeResult: boolean;
	titleText: string;
	subTitleText: string;
	resultRecommended: FlightItemGroup[];
	resultCheapest: FlightItemGroup[];
	resultShortest: FlightItemGroup[];

	constructor(private _vocabulary: VocabularyService,
				private _iconReg: MatIconRegistry,
				private _sanitizer: DomSanitizer,) {
		_iconReg.addSvgIcon('h21_baggage',
			_sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-baggage-blue.svg'));
		_iconReg.addSvgIcon('h21_no_baggage',
			_sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-no-baggage-gray.svg'));
		_iconReg.addSvgIcon('h21_luggage',
			_sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-luggage-blue.svg'));
		_iconReg.addSvgIcon('h21_no_luggage',
			_sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-no-luggage-gray.svg'));
		_iconReg.addSvgIcon('h21_night',
			_sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-night-blue.svg'));
		this.init();
	}

	init() {
		this.titleText = '';
		this.subTitleText = '';
		this.searchInProgress = false;
		this.searchResultReady = false;
		this.showFakeResult = false;
	}

	search(options: SearchFlightDto): void {
		this.searchInProgress = true;
		this.showFakeResult = true;
		this.searchResultReady = false;
		setTimeout(() => {
			this._vocabulary.searchFlights(options).subscribe(result => {
				this.searchInProgress = false;
				this.showFakeResult = false;
				if (result.groups) {
					this.titleText = 'London (LON) to - Barcelona (BCN) 2 flights';
					this.subTitleText = 'Fri 18 May - Fri 25 May 1 adult. Economy';
					this.resultRecommended = result.groups;
					this.resultCheapest = result.groups.map(x => x).sort((a, b) => a.price - b.price);
					this.resultShortest = result.groups.map(x => x).sort((a, b) => a.totalElapsedTime - b.totalElapsedTime);
				} else {
					this.titleText = '';
					this.subTitleText = '';
					this.resultRecommended = [];
					this.resultCheapest = [];
					this.resultShortest = [];
				}
			});
			setTimeout(() => {
				this.searchResultReady = true;
				this.onSearchResultReady.emit(this.resultRecommended);
			}, 250);
		}, 2000);
	}

	clear(): void {
		this.titleText = '';
		this.subTitleText = '';
		this.searchInProgress = true;
		this.showFakeResult = true;
		this.searchResultReady = false;
		this.resultRecommended = [];
		this.resultCheapest = [];
		this.resultShortest = [];
	}

	getPriceString(groups: FlightItemGroup[]): string {
		return groups && groups[0] ? groups[0].price.toString() : "0";
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
