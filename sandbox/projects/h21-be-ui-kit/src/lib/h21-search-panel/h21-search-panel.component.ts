import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { SearchFlightDto } from '../../dto/search-flight-dto';
import { FlyRoute } from '../../dto/fly-route';

@Component({
  selector: 'h21-search-panel',
  templateUrl: './h21-search-panel.component.html'
})

export class H21SearchPanelComponent implements OnInit {
	constructor(private _appSubscriber: AppSubscriberService,
		private _snackBar: MatSnackBar) {
		this.searchOptions = <SearchFlightDto>{
			flyRoutes: [<FlyRoute>{
				minDate: new Date(),
				rangeDateMode: true
			}],
			searchMode: 'round_trip'
		};
	}

	public ngOnInit(): void {

	}

	@Output() onSearch: EventEmitter<SearchFlightDto> = new EventEmitter<SearchFlightDto>();
	@Output() onClearSearch: EventEmitter<void> = new EventEmitter<void>();
	searchOptions: SearchFlightDto;

	addFlyRoute() {
		if (this.searchOptions.flyRoutes.length == 5) {
			this._snackBar.open('Maximum of routes is 5', '', {
				duration: 1000,
				panelClass: 'c-h21-passengers-error_snackbar'
			});
			return;
		}

		var flyRoute = <FlyRoute>{};
		var previous = this.searchOptions.flyRoutes[this.searchOptions.flyRoutes.length - 1];
		if (!previous.cityFrom || !previous.cityTo || !previous.arrivalDate) {
			this._snackBar.open('Please fill last route', '', {
				duration: 1000,
				panelClass: 'c-h21-passengers-error_snackbar'
			});
			return;
		}
		flyRoute.minDate = previous.arrivalDate;
		flyRoute.cityFrom = previous.cityTo;
		flyRoute.cityTo = previous.cityFrom;
		flyRoute.arrivalDate = new Date(previous.arrivalDate);
		flyRoute.arrivalDate.setDate(flyRoute.arrivalDate.getDate() + 4);

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
		if (this.searchOptions.searchMode == 'multi_city') {
			while (this.searchOptions.flyRoutes.length > 1) {
				this.searchOptions.flyRoutes.pop();
			}
		}
		this.searchOptions.flyRoutes[0].cityFrom = null;
		this.searchOptions.flyRoutes[0].cityTo = null;
		this.searchOptions.flyRoutes[0].arrivalDate = null;

		this._appSubscriber.clearSearch();
	}

	search() {
		console.log(this.searchOptions);
		this._appSubscriber.search(this.searchOptions);
	}
}
