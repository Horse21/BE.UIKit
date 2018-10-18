import {City} from './city';

export class FlyRoute {
	cityFrom: City;
	cityTo: City;
	departureDate: Date;
	returnDate: Date;
	minDate: Date;
	rangeDateMode: boolean;
}
