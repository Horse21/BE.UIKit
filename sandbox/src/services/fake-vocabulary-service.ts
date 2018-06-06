import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs/index';
import { VocabularyService } from '../../../sandbox/projects/h21-be-ui-kit/src/services/vocabulary-service';
import { City } from '../../../sandbox/projects/h21-be-ui-kit/src/dto/city';
import { Observable } from 'rxjs';
import { FlightItem } from '../../projects/h21-be-ui-kit/src/dto/flight-item';
import { SearchFlightDto } from '../../projects/h21-be-ui-kit/src/dto/search-flight-dto';
import { SearchResult } from '../../projects/h21-be-ui-kit/src/dto/search-result';
import { FlightItemGroup } from '../../projects/h21-be-ui-kit/src/dto/flight-item-group';
import { Passenger } from '../../projects/h21-be-ui-kit/src/dto/passenger';

@Injectable()
export class FakeVocabularyService implements VocabularyService {
	public getCities(pattern: string): Observable<City[]> {
		var data = [
			<City>{
				id: 1,
				name: "Moscow"
			},
			<City>{
				id: 2,
				name: "New York"
			},
			<City>{
				id: 3,
				name: "Bagdad"
			},
			<City>{
				id: 4,
				name: "Erevan"
			}
		];
		return Observable.create((observer: Subscriber<any>) => {
			observer.next(data);
			observer.complete();
		});
	}

	public searchFlights(options: SearchFlightDto): Observable<SearchResult> {
		var data = {
			groups: [
				<FlightItemGroup>{
					price: 250,
					totalElapsedTime: 355,
					items: [
						<FlightItem>{
							arrivalDateTime: new Date(),
							arrivalAirportCode: "MOS",
							elapsedTime:100,
							departureDateTime: new Date(),
							departureAirportCode: "SPB",
							arrivalLogo: "swiss.svg",
							departureLogo: "swiss.svg",
							transfers: [{
								time: new Date()
							}]
						},
						<FlightItem>{
							arrivalDateTime: new Date(),
							arrivalAirportCode: "LON",
							elapsedTime:100,
							departureDateTime: new Date(),
							departureAirportCode: "SPB",
							arrivalLogo: "swiss.svg",
							departureLogo: "swiss.svg"
						}
					]
				},
				<FlightItemGroup>{
					price: 250,
					totalElapsedTime: 345,
					items: [
						<FlightItem>{
							arrivalDateTime: new Date(),
							arrivalAirportCode: "MOS",
							elapsedTime:100,
							departureDateTime: new Date(),
							departureAirportCode: "SPB",
							arrivalLogo: "swiss.svg",
							departureLogo: "swiss.svg"
						},
						<FlightItem>{
							arrivalDateTime: new Date(),
							arrivalAirportCode: "LON",
							elapsedTime:100,
							departureDateTime: new Date(),
							departureAirportCode: "SPB",
							arrivalLogo: "swiss.svg",
							departureLogo: "swiss.svg"
						}
					]
				},
				<FlightItemGroup>{
					price: 250,
					totalElapsedTime: 290,
					items: [
						<FlightItem>{
							arrivalDateTime: new Date(),
							arrivalAirportCode: "MOS",
							elapsedTime:100,
							departureDateTime: new Date(),
							departureAirportCode: "SPB",
							arrivalLogo: "swiss.svg",
							departureLogo: "swiss.svg"
						},
						<FlightItem>{
							arrivalDateTime: new Date(),
							arrivalAirportCode: "LON",
							elapsedTime:100,
							departureDateTime: new Date(),
							departureAirportCode: "SPB",
							arrivalLogo: "swiss.svg",
							departureLogo: "swiss.svg"
						}
					]
				}
			]
		};
		return Observable.create((observer: Subscriber<any>) => {
			observer.next(data);
			observer.complete();
		});
	}

	public searchPassengers(pattern: string): Observable<Passenger[]> {
		var data = [
			<Passenger>{
				id: "1",
				surname: "Barak",
				firstName: "Obama",
				company: "H21Horse",
				position: "Ex President"
			},
			<Passenger>{
				id: "2",
				surname: "Gorge",
				firstName: "Bush",
				company: "Ex Ex President"
			},
			<Passenger>{
				id: '3',
				surname: "Abraam",
				firstName: "Linkoln",
				company: "Super Ex President"
			},
			<Passenger>{
				id: '4',
				surname: "Saddam",
				firstName: "Hussein",
				company: "No Dictator"
			}
		];
		return Observable.create((observer: Subscriber<any>) => {
			observer.next(data);
			observer.complete();
		});
	}
}
