import { Airport } from './airport';

export class City {
	id: number;
	code: string;
	countryCode: string;
	name: string;
	isTransient: boolean;
	airports: Airport[];
}
