import { FlightItemTransfer } from './flight-item-transfer';

export class FlightItem {
	departureDateTime: Date;
	arrivalDateTime: Date;
	flightNumber: string;
	resBookDesigCode: string;
	elapsedTime: number;
	departureAirportCode: string;
	departureAirportTerminal: string;
	arrivalAirportCode: string;
	arrivalAirportTerminal: string;
	arrivalLogo: string;
	departureLogo: string;
	transfers: FlightItemTransfer[];
}
