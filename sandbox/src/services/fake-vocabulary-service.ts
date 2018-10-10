import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { VocabularyService } from '../../projects/h21-be-ui-kit/src/services/vocabulary-service';
import { City } from '../../projects/h21-be-ui-kit/src/dto/city';
import { Observable } from 'rxjs';
import { FlightItem } from '../../projects/h21-be-ui-kit/src/dto/flight-item';
import { SearchFlightDto } from '../../projects/h21-be-ui-kit/src/dto/search-flight-dto';
import { SearchResult } from '../../projects/h21-be-ui-kit/src/dto/search-result';
import { FlightItemGroup } from '../../projects/h21-be-ui-kit/src/dto/flight-item-group';
import { Passenger } from '../../projects/h21-be-ui-kit/src/dto/passenger';
import { IHotelInfo, IHotelSearchOptions } from "../../projects/h21-be-ui-kit/src/dto";
import { IHotelOption } from "../../projects/h21-be-ui-kit/src/dto/i-hotel-option";

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

	public searchHotels(options: IHotelSearchOptions): Observable<IHotelInfo[]> {
		var data = [
			<IHotelInfo> {
				id: 1,
				photo: '/assets/samples_img/hotel_card/hotel-1.jpg',
				name: 'Pestana Amsterdam Riverside – LVX Preferred Hotels & Resorts',
				rate: 5,
				isFavorite: false,
				location: 'Amsteldijk 67, Oud Zuid, 1074 HZ Amsterdam, Netherlands',
				options: [
					<IHotelOption> {icon: 'check_circle', name: 'Free cancellation'},
					<IHotelOption> {icon: 'check_circle', name: 'Breakfast included'},
				],
				provider: 'GTA',
				price: 175.24,
				fee: 1.54,
			},
			<IHotelInfo> {
				id: 2,
				photo: '/assets/samples_img/hotel_card/hotel-2.jpg',
				name: 'NH Amsterdam Schiller',
				rate: 4,
				isFavorite: true,
				location: 'Rembrandtplein 26-36, Amsterdam, Netherlands, 1017 CV',
				options: [
					<IHotelOption> {icon: 'check_circle', name: 'Free cancellation'},
					<IHotelOption> {icon: 'check_circle', name: 'Breakfast included'},
				],
				provider: 'GTA',
				price: 275.24,
				fee: 1.54,
			},
			<IHotelInfo> {
				id: 3,
				photo: '/assets/samples_img/hotel_card/hotel-1.jpg',
				name: 'Pestana Amsterdam Riverside – LVX Preferred Hotels & Resorts',
				rate: 5,
				isFavorite: false,
				location: 'Amsteldijk 67, Oud Zuid, 1074 HZ Amsterdam, Netherlands',
				options: [
					<IHotelOption> {icon: 'check_circle', name: 'Free cancellation'},
					<IHotelOption> {icon: 'check_circle', name: 'Breakfast included'},
				],
				provider: 'GTA',
				price: 375.24,
				fee: 1.54,
			},
			<IHotelInfo> {
				id: 4,
				photo: '/assets/samples_img/hotel_card/hotel-2.jpg',
				name: 'NH Amsterdam Schiller',
				rate: 3,
				isFavorite: false,
				location: 'Rembrandtplein 26-36, Amsterdam, Netherlands, 1017 CV',
				options: [
					<IHotelOption> {icon: 'check_circle', name: 'Free cancellation'},
					<IHotelOption> {icon: 'check_circle', name: 'Breakfast included'},
				],
				provider: 'GTA',
				price: 475.24,
				fee: 1.54,
			},
		];
		return Observable.create((observer: Subscriber<any>) => {
			observer.next(data);
			observer.complete();
		});
	}
}
