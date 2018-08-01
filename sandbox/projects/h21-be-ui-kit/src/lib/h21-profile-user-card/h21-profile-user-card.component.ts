import {Component, Input} from "@angular/core"

export interface Claim {
	type: string;
	value: string;
}

const CLAIMS_DATA: Claim[] = [
	{ type: "Email", value: "name@mysite.com" },
	{ type: "Gender", value: "Male" },
	{ type: "Given Name", value: "Name" },
	{ type: "Family Name", value: "Surname" },
	{ type: "Middle name", value: "" },
	{ type: "Locale", value: "ru-RU" },
	{ type: "Agent_id", value: "2" },
	{ type: "User_tag", value: "SuperAdmin" },
	{ type: "Read_disk_folder", value: "1" },
];

@Component ({
	selector: 'h21-profile-user-card',
	templateUrl: './h21-profile-user-card.component.html'
})

export class H21ProfileUserCardComponent {
	claimsDisplayedColumns: string[] = ['type', 'value'];
	claimsData = CLAIMS_DATA;

	@Input() editable: boolean;

	constructor () {
		this.editable = false;
	}
}
