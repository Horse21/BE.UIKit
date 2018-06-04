import { Injectable } from '@angular/core';
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
}
