import {Component, EventEmitter, Output, ViewChildren} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AppSubscriberService} from '../../services/app-subscriber-service';
import {SearchFlightDto} from '../../dto/search-flight-dto';
import {FlyRoute} from '../../dto/fly-route';
import {H21FlyRouteSelectionComponent} from "./h21-fly-route-selection.component";

@Component({
	selector: 'h21-air-search-panel',
	templateUrl: './h21-air-search-panel.component.html'
})

export class H21AirSearchPanelComponent {

	@Output() onSearch: EventEmitter<SearchFlightDto>;
	@Output() onClearSearch: EventEmitter<void>;
	searchOptions: SearchFlightDto;

	@ViewChildren(H21FlyRouteSelectionComponent) private _routes: H21FlyRouteSelectionComponent[];

	constructor(private _appSubscriber: AppSubscriberService,
				private _snackBar: MatSnackBar) {
		this.init();
	}

	init() {
		this.onSearch = new EventEmitter<SearchFlightDto>();
		this.onClearSearch = new EventEmitter<void>();
		this.searchOptions = <SearchFlightDto>{
			flyRoutes: [<FlyRoute>{
				minDate: new Date(),
				rangeDateMode: true,
			}],
			searchMode: 'round_trip',
			anyNumberOfStops: true,
			nonstopOnly: true,
			oneStopOfFewer: true,
			directFlight: false,
			refundableFlights: false,
			showTransfers: false,
			showHotels: false
		};
	}

	addFlyRoute() {
		if (this.searchOptions.flyRoutes.length == 5) {
			this._snackBar.open('Maximum of routes is 5', '', {
				duration: 1000,
				panelClass: 'c-h21-passengers-error_snackbar'
			});
			return;
		}

		let flyRoute = <FlyRoute>{};
		let previous = this.searchOptions.flyRoutes[this.searchOptions.flyRoutes.length - 1];
		console.log(previous);
		if (!previous.cityFrom || !previous.cityTo || !previous.departureDate) {
			this._snackBar.open('Please fill last route', '', {
				duration: 1000,
				panelClass: 'c-h21-passengers-error_snackbar'
			});
			return;
		}
		flyRoute.minDate = previous.departureDate;
		flyRoute.cityFrom = previous.cityTo;
		flyRoute.cityTo = previous.cityFrom;
		flyRoute.departureDate = new Date(previous.departureDate);
		flyRoute.departureDate.setDate(flyRoute.departureDate.getDate() + 4);

		this.searchOptions.flyRoutes.push(flyRoute);
	}

	removeFlyRoute() {
		this.searchOptions.flyRoutes.pop();
	}

	canAdd(i: number): boolean {
		return (
			this.searchOptions.flyRoutes.length == i + 1 && this.searchOptions.searchMode == 'multi_city'
		);
	}

	canRemove(i: number): boolean {
		return this.searchOptions.searchMode == 'multi_city' && this.searchOptions.flyRoutes.length == i + 1 && i != 0;
	}

	changeMode() {
		switch (this.searchOptions.searchMode) {
			case 'one_way':
			case 'multi_city': {
				this.searchOptions.flyRoutes[0].rangeDateMode = false;
				break;
			}
			case 'round_trip': {
				this.searchOptions.flyRoutes[0].rangeDateMode = true;
				break;
			}
		}
	}

	clearSearch() {
		this.searchOptions = <SearchFlightDto>{
			flyRoutes: [<FlyRoute>{
				minDate: new Date(),
				rangeDateMode: true,
			}],
			searchMode: 'round_trip',
			anyNumberOfStops: true,
			nonstopOnly: true,
			oneStopOfFewer: true,
			directFlight: false,
			refundableFlights: false,
			showTransfers: false,
			showHotels: false
		};

		this._appSubscriber.clearSearch();
		this.onClearSearch.emit();
	}

	search() {
		let hasErrors = false;
		this._routes.forEach((route: H21FlyRouteSelectionComponent) => {
			route.validate();
			hasErrors = route.invalid ? route.invalid : hasErrors;
		});

		if (!hasErrors) {
			this.onSearch.emit(this.searchOptions);
		}
	}
}
