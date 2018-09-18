import {IHotelOption} from "./i-hotel-option";

export interface IHotelInfo {
	id: number;
	photo: string; // url path
	name: string;
	rate: number;
	isFavorite: boolean;
	location: string;
	options: Array<IHotelOption>;
	provider: string;
	price: number;
	fee: number;
}
