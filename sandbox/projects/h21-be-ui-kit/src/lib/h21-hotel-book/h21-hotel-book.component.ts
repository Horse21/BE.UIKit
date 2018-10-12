import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {DxDataGridComponent} from 'devextreme-angular';
import {IPicture} from "../../dto";
import {IHotelRoomDetail} from "../../dto/i-hotel-room-detail";
import {IHotelRoom} from "../../dto/i-hotel-room";

const HOTEL_ROOM_OPTION_DATA = [
	{ icon: 'visibility', name: 'City view'},
	{ icon: 'ac_unit', name: 'Air conditioning'},
	{ icon: 'desktop_windows', name: 'Air conditioning'},
	{ icon: 'local_bar', name: 'Bar'},
	{ icon: 'pets', name: 'Pets allowed'},
	{ icon: 'volume_off', name: 'Soundproof'},
];

const ROOM_PHOTOS: Array<IPicture> = [
	{ large: './assets/samples_img/room/room-1-large.jpg', medium: './assets/samples_img/room/room-1-medium.jpg', thumbnail: './assets/samples_img/room/room-1-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/room/room-2-large.jpg', medium: './assets/samples_img/room/room-2-medium.jpg', thumbnail: './assets/samples_img/room/room-2-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/room/room-3-large.jpg', medium: './assets/samples_img/room/room-3-medium.jpg', thumbnail: './assets/samples_img/room/room-3-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/room/room-4-large.jpg', medium: './assets/samples_img/room/room-4-medium.jpg', thumbnail: './assets/samples_img/room/room-4-thumbnail.jpg', altText: ''},
];

const HOTEL_ROOM_DATA: IHotelRoomDetail = {
	description: 'Located in one of the monumental buildings or the new River House. This deluxe room offers a king size bed and has tea/coffee making facilities, a minibar and cable TV. Free WiFi is available. The private bathroom is equipped with a spacious walk-in shower and a hair dryer.',
	photos: ROOM_PHOTOS,
	options: HOTEL_ROOM_OPTION_DATA
};

const HOTEL_DATA: Array<IHotelRoom> = [
	{ id: 1, hotelId: 1, type: 'Standart double room', class: 'Superior', board: 'Room only', clxPolicy: 'Non-refundable',  provider: 'HB',  fee: 10.47, price: 800.00, detail: HOTEL_ROOM_DATA },
	{ id: 2, hotelId: 1, type: 'Standart double room', class: 'Superior', board: 'Room only', clxPolicy: 'Free',  provider: 'HB',  fee:  10.47, price: 790.00, detail: HOTEL_ROOM_DATA },
	{ id: 3, hotelId: 1, type: 'Standart double room', class: 'Superior', board: 'Room only', clxPolicy: 'Non-refundable',  provider: 'HB',  fee:  10.47, price: 830.50, detail: HOTEL_ROOM_DATA },
	{ id: 4, hotelId: 1, type: 'Standart double room', class: 'Superior', board: 'Room only', clxPolicy: 'Free',  provider: 'HB',  fee:  10.47, price: 720.00, detail: HOTEL_ROOM_DATA },
	{ id: 5, hotelId: 1, type: 'Standart double room', class: 'Superior', board: 'Room only', clxPolicy: 'Non-refundable',  provider: 'HB',  fee:  10.47, price: 600.00, detail: HOTEL_ROOM_DATA },
	{ id: 6, hotelId: 1, type: 'Standart double room', class: 'Superior', board: 'Room only', clxPolicy: 'Free',  provider: 'HB',  fee:  10.47, price: 550.00, detail: HOTEL_ROOM_DATA },
	{ id: 7, hotelId: 1, type: 'Standart double room', class: 'Superior', board: 'Room only', clxPolicy: 'Non-refundable',  provider: 'HB',  fee:  10.47, price: 900.50, detail: HOTEL_ROOM_DATA },
	{ id: 8, hotelId: 1, type: 'Standart double room', class: 'Superior', board: 'Room only', clxPolicy: 'Free',  provider: 'HB',  fee:  10.47, price: 1000.00, detail: HOTEL_ROOM_DATA },
];

const HOTEL_PHOTOS: Array<IPicture> = [
	{ large: './assets/samples_img/hotel/hotel-1-large.jpg', medium: './assets/samples_img/hotel/hotel-1-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-1-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-2-large.jpg', medium: './assets/samples_img/hotel/hotel-2-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-2-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-3-large.jpg', medium: './assets/samples_img/hotel/hotel-3-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-3-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-4-large.jpg', medium: './assets/samples_img/hotel/hotel-4-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-4-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-5-large.jpg', medium: './assets/samples_img/hotel/hotel-5-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-5-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-4-large.jpg', medium: './assets/samples_img/hotel/hotel-4-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-4-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-5-large.jpg', medium: './assets/samples_img/hotel/hotel-5-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-5-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-2-large.jpg', medium: './assets/samples_img/hotel/hotel-2-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-2-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-3-large.jpg', medium: './assets/samples_img/hotel/hotel-3-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-3-thumbnail.jpg', altText: ''},
	{ large: './assets/samples_img/hotel/hotel-1-large.jpg', medium: './assets/samples_img/hotel/hotel-1-medium.jpg', thumbnail: './assets/samples_img/hotel/hotel-1-thumbnail.jpg', altText: ''},
];


@Component({
	selector: 'h21-hotel-book',
	templateUrl: './h21-hotel-book.component.html'
})

export class H21HotelBookComponent implements OnInit {

	@ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

	@Input() nightsCount: number;

	isFavorite: boolean = false;
	favoriteTooltipText: string = '';
	currencyCode = 'EUR';
	photos: Array<IPicture>;
	selectedRows: Array<number>;

	rooms: Array<IHotelRoom> = HOTEL_DATA;

	constructor() {
		this.nightsCount = 10;
		this.photos = HOTEL_PHOTOS;
		this.selectedRows = new Array<number>();
	}

	ngOnInit() {
		this.favoriteTooltipText = this.isFavorite ? 'Remove from favorites' : 'Add in favorites';
	}

	favoriteToggle() {
		this.isFavorite = !this.isFavorite;
		this.favoriteTooltipText = this.isFavorite ? 'Remove from favorites' : 'Add in favorites';
	}

	addToCart(id: number): void {
		this.selectedRows.push(id);
	}

	removeFromCart(_id: number): void {
		let index = this.selectedRows.findIndex((id) => { return id == _id; });
		if (index >= 0) {
			this.selectedRows.splice(index, 1);
		}
	}

	isSelected(id: number): boolean {
		let index = this.selectedRows.findIndex((item) => { return item == id; });
		return index >= 0;
		//return this.selectedRows.includes(id);
	}

	expandDetail(id: number): void {
		this.dataGrid.instance.expandRow(id);
	}

	collapseDetail(id: number): void {
		this.dataGrid.instance.collapseRow(id);
	}

	isExpanded(id: number): boolean {
		return this.dataGrid.instance.isRowExpanded(id);
	}

	highlightExpandedRow(e: any): void {
		console.log(e);
		let id = e.key;
		let index = this.dataGrid.instance.getRowIndexByKey(id);
		let rows = this.dataGrid.instance.getRowElement(index);
		rows[0].classList.add('h21-data-grid_expanded-detail-row');
	}

	unHighlightExpandedRow(e: any): void {
		console.log(e);
		let id = e.key;
		let index = this.dataGrid.instance.getRowIndexByKey(id);
		let rows = this.dataGrid.instance.getRowElement(index);
		rows[0].classList.remove('h21-data-grid_expanded-detail-row');
	}

	init() {

	}
}
