export interface IHotelSearchOptions {
	paymentMethod: 'account' | 'hotel';
	destination: string;
	nationality: string;
	poi: string;
	checkInDate: Date;
	checkOutDate: Date;
	nightsCount: number;
	roomsCount: number;
	roomsType: string[];
}
