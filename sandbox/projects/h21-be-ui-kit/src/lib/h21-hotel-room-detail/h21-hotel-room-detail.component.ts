import {Component, Input} from "@angular/core";
import {IHotelRoomDetail} from "../../dto/i-hotel-room-detail";

@Component({
	selector: 'h21-hotel-room-detail',
	templateUrl: './h21-hotel-room-detail.component.html',
})

export class H21HotelRoomDetailComponent {
	@Input() data: IHotelRoomDetail;
	selectedPhotoUrl: string;
	selectedPhotoAltText: string;

	constructor() {

	}

	ngOnInit() {
		if (this.data.photos) {
			this.selectedPhotoUrl = this.data.photos[0].medium;
			this.selectedPhotoAltText = this.data.photos[0].altText;
		}
	}

	changeRoomPhoto(url: string, alt: string = ''): void {
		this.selectedPhotoUrl = url;
		this.selectedPhotoAltText = alt;
	}
}
