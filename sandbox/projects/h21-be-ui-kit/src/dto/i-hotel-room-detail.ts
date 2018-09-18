import {IPicture} from "./index";
import {IHotelOption} from "./i-hotel-option";

export interface IHotelRoomDetail {
	description: string;
	photos: Array<IPicture>;
	options: Array<IHotelOption>;
}
