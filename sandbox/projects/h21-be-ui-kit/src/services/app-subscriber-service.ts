import { Injectable } from '@angular/core';
import { Passenger } from '../dto/passenger';
import { SearchFlightDto } from '../dto/search-flight-dto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppSubscriberService {

	/* search events */

	private _search = new Subject<SearchFlightDto>();

	search(searchOptions: SearchFlightDto) {
		return this._search.next(searchOptions);
	}

	clearSearch() {
		return this._search.next();
	}

	searchObservable(): Observable<any> {
		return this._search.asObservable();
	}

	/* search mode in toolbar */

	private _searchResultMode = new Subject<string>();

	searchResultMode(mode: string) {
		return this._searchResultMode.next(mode);
	}

	searchResultModeObservable(): Observable<string> {
		return this._searchResultMode.asObservable();
	}

	/* traveler selector */

	private _traveler = new Subject<any>();
	private _removeTraveler = new Subject<any>();

	addTraveler(traveler: Passenger) {
		return this._traveler.next(traveler);
	}

	removeTraveler(traveler: Passenger) {
		return this._removeTraveler.next(traveler);
	}

	travelerObservable(): Observable<Passenger> {
		return this._traveler.asObservable();
	}

	removeTravelerObservable(): Observable<Passenger> {
		return this._removeTraveler.asObservable();
	}

	/* route dates */

	private _departureDate = new Subject<any>();

	departureDateChanged(data: any) {
		return this._departureDate.next(data);
	}

	departureDateObservable(): Observable<any> {
		return this._departureDate.asObservable();
	}

	/* menu close */

	private _closeMenu = new Subject<void>();

	closeMenu() {
		return this._closeMenu.next();
	}

	closeMenuObservable(): Observable<void> {
		return this._closeMenu.asObservable();
	}
}
