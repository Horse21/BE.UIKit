import { Component, EventEmitter, Output } from '@angular/core';
import { SearchFlightDto } from '../../dto/search-flight-dto';
import { FlyRoute } from '../../dto/fly-route';

@Component({
  selector: 'h21-search-panel',
  templateUrl: './h21-search-panel.component.html'
})

export class H21SearchPanelComponent {
	constructor() {
		this.searchOptions = <SearchFlightDto>{
			flyRoutes: [<FlyRoute>{},<FlyRoute>{}],
			searchMode: 'round_trip'
		};
	}

	@Output() onSearch: EventEmitter<SearchFlightDto> = new EventEmitter<SearchFlightDto>();
	@Output() onClearSearch: EventEmitter<void> = new EventEmitter<void>();
	searchOptions: SearchFlightDto;

	addFlyRoute() {
		var flyRoute = <FlyRoute>{};
		var previous = this.searchOptions.flyRoutes[this.searchOptions.flyRoutes.length - 1];
		console.log(this.searchOptions.flyRoutes);
		if (!!previous.cityTo) {
			flyRoute.cityFrom = previous.cityTo;
		}
		console.log(flyRoute);
		this.searchOptions.flyRoutes.push(flyRoute);
	}

	removeFlyRoute() {
		this.searchOptions.flyRoutes.pop();
	}

	canAdd(i: number): boolean {
		return (
				   this.searchOptions.flyRoutes.length == i + 1 && this.searchOptions.searchMode == 'multi_city'
			   ) ||
			   (
				   this.searchOptions.searchMode == 'round_trip' && this.searchOptions.flyRoutes.length == 1
			   );
	}

	canRemove(i: number): boolean {
		return this.searchOptions.searchMode == 'multi_city' && this.searchOptions.flyRoutes.length == i + 1 && i != 0;
	}

	changeMode() {
		switch (this.searchOptions.searchMode) {
			case 'one_way': {
				while (this.searchOptions.flyRoutes.length > 1) {
					this.searchOptions.flyRoutes.pop();
				}
				break;
			}
			case 'round_trip': {
				while (this.searchOptions.flyRoutes.length > 2) {
					this.searchOptions.flyRoutes.pop();
				}
				if (this.searchOptions.flyRoutes.length == 1) {
					this.searchOptions.flyRoutes.push(<FlyRoute>{});
				}
				break;
			}
		}
	}

	clearSearch() {
		switch (this.searchOptions.searchMode) {
			case 'one_way': {
				this.searchOptions.flyRoutes[0].cityFrom = null;
				this.searchOptions.flyRoutes[0].cityTo = null;
				break;
			}
			case 'round_trip': {
				this.searchOptions.flyRoutes[0].cityFrom = null;
				this.searchOptions.flyRoutes[0].cityTo = null;
				this.searchOptions.flyRoutes[1].cityFrom = null;
				this.searchOptions.flyRoutes[1].cityTo = null;
				break;
			}
			case 'multi_city': {
				while (this.searchOptions.flyRoutes.length > 1) {
					this.searchOptions.flyRoutes.pop();
				}
				this.searchOptions.flyRoutes[0].cityFrom = null;
				this.searchOptions.flyRoutes[0].cityTo = null;
				break;
			}
		}
		this.onClearSearch.emit();
	}
}
