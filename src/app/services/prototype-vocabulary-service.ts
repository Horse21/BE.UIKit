import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { VocabularyService } from '../../../sandbox/projects/h21-be-ui-kit/src/services/vocabulary-service';
import { City } from '../../../sandbox/projects/h21-be-ui-kit/src/dto/city';
import { Observable } from 'rxjs';

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
}
