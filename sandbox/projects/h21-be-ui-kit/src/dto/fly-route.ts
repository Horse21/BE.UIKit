
import { City } from './city';

export class FlyRoute {
	cityFrom: City;
	cityTo: City;
	arrivalDate: Date;
	returnDate: Date;
	minDate: Date;
	rangeDateMode: boolean;
}
