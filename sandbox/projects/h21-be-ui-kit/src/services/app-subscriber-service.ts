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

	private _arrivalDate = new Subject<any>();

	arrivalDateChanged(data: any) {
		return this._arrivalDate.next(data);
	}

	arrivalDateObservable(): Observable<any> {
		return this._arrivalDate.asObservable();
	}

	/* two month calendar */

	private _calendarFromDate = new Subject<any>();

	changeSelectedFromDate(data: any) {
		return this._calendarFromDate.next(data);
	}

	changeSelectedFromObservable(): Observable<any> {
		return this._calendarFromDate.asObservable();
	}
}
