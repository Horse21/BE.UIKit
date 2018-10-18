import { FlyRoute } from './fly-route';

/* search options */
export class SearchFlightDto {
	searchMode: string;
	flyRoutes: FlyRoute[];
	preferredClass: string;
	directFlight: boolean;
	refundableFlights: boolean;
	showTransfers: boolean;
	showHotels: boolean;
	// stops
	anyNumberOfStops: boolean;
	nonstopOnly: boolean;
	oneStopOfFewer: boolean;
	twoStopOfFewer: boolean;
	// price
	priceFrom: number;
	priceTo: number;
}
