import { FlightItem } from '../dto/flight-item';

export class SearchResult {
	recommended: FlightItem[];
	cheapest: FlightItem[];
	shortest: FlightItem[];
}
