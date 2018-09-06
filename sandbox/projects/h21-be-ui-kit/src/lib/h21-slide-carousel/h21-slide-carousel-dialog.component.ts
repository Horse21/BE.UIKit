import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../h21-two-month-calendar/h21-two-month-calendar-dialog.component";

@Component({
	selector: '',
	template: `
	<div>
		<img src="{{url}}" alt="" />
	</div>
	`,
})

export class H21SlideCarouselDialogComponent {

	url: string = '';

	constructor(@Inject(MAT_DIALOG_DATA) public data: any,
				public dialogRef: MatDialogRef<H21SlideCarouselDialogComponent>) {
		this.url = data.imgUrl;
	}
}
