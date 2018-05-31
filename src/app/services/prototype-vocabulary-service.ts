import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { VocabularyService } from '../../../sandbox/projects/h21-be-ui-kit/src/services/vocabulary-service';
import { City } from '../../../sandbox/projects/h21-be-ui-kit/src/dto/city';
import { Observable } from 'rxjs';
import { FlightItem } from '../../../sandbox/projects/h21-be-ui-kit/src/dto/flight-item';
import { SearchFlightDto } from '../../../sandbox/projects/h21-be-ui-kit/src/dto/search-flight-dto';

@Injectable()
export class PrototypeVocabularyService implements VocabularyService {

	constructor(private _http: HttpClient) {
	}

	public getCities(pattern: string): Observable<City[]> {
		if (!pattern || pattern.length < 2) {
			return Observable.create();
		}
		return this._http.get<City[]>("../../assets/prototype-storage/Cities.json")
			.pipe(map(data => {
				return data.filter(x => x.name.indexOf(pattern) != -1)
					.filter((i, index) => (
						index < 10
					));
			}));
	}

	public searchFlights(options: SearchFlightDto): Observable<FlightItem[]> {
		return this._http.get<FlightItem[]>("../../assets/prototype-storage/one-way.json")
			.pipe(map(data => {
				return data.filter((i, index) => index < 10);
			}));
	}
}
