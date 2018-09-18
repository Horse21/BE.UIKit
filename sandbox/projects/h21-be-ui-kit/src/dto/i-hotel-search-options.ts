export interface IHotelSearchOptions {
	paymentMethod: 'account' | 'hotel';
	destination: string;
	nationality: string;
	checkInDate: Date;
	checkOutDate: Date;
	nightsCount: number;
	roomCount: number;
}
