import {IHotelRoomDetail} from "./i-hotel-room-detail";

export interface IHotelRoom {
	id: number;
	hotelId: number;
	type: string;
	class: string;
	board: string;
	clxPolicy: string;
	provider: string;
	fee: number;
	price: number;
	detail: IHotelRoomDetail;
}
