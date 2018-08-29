import { Passenger } from '../dto/passenger';
import { SearchResult } from '../dto/search-result';
import { SearchFlightDto } from '../dto/search-flight-dto';
import { Observable } from 'rxjs';
import { City } from '../dto/city';
import { Injectable } from '@angular/core'

@Injectable()
export abstract class VocabularyService {
	abstract getCities(pattern: string): Observable<City[]>;

	abstract searchFlights(options: SearchFlightDto): Observable<SearchResult>;

	abstract searchPassengers(pattern: string): Observable<Passenger[]>;
}