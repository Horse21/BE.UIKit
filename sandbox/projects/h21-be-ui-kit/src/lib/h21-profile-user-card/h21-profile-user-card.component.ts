import {Component, Input} from "@angular/core"
import {FormControl, Validators} from "@angular/forms";

export interface Claim {
	id: number;
	type: string;
	value: string;
}

export interface Folder {
	id: number;
	name: string;
	permission: string;
}

export interface Country {
	id: number;
	name: string;
}

export interface City {
	id: number;
	countryId: number;
	name: string;
}

export interface Code {
	id: number;
	cityId: number;
	code: string;
}

export interface History {
	id: number;
	date: Date;
	action: string;
	user: string;
	expandData: [
		{
			field: string;
			oldValue: string;
			newValue: string
		}]
}


const CLAIMS_DATA: Claim[] = [
	{id: 1, type: "Email", value: "name@mysite.com"},
	{id: 2, type: "Gender", value: "Male"},
	{id: 3, type: "Given Name", value: "Name"},
	{id: 4, type: "Family Name", value: "Surname"},
	{id: 5, type: "Middle name", value: ""},
	{id: 6, type: "Locale", value: "ru-RU"},
	{id: 7, type: "Agent_id", value: "2"},
	{id: 8, type: "User_tag", value: "SuperAdmin"},
	{id: 9, type: "Read_disk_folder", value: "1"},
];

const FOLDERS_DATA: Folder[] = [
	{id: 1, name: "Docs", permission: "Contributor"},
	{id: 2, name: "Users", permission: "Reader"}
];

const COUNTRIES_DATA: Country[] = [
	{id: 1, name: "England"},
	{id: 2, name: "France"},
	{id: 3, name: "Germany"},
	{id: 4, name: "Russia"},
	{id: 5, name: "USA"}
];

const CITIES_DATA: City[] = [
	{id: 1, countryId: 1, name: "London"},
	{id: 2, countryId: 2, name: "Berlin"},
	{id: 3, countryId: 3, name: "Paris"},
	{id: 4, countryId: 4, name: "Moscow"},
	{id: 5, countryId: 5, name: "Washington"}
];

const CODES_DATA: Code[] = [
	{id: 1, cityId: 1, code: "10000"},
	{id: 2, cityId: 2, code: "20000"},
	{id: 3, cityId: 3, code: "30000"},
	{id: 4, cityId: 4, code: "40000"},
	{id: 5, cityId: 5, code: "50000"},
];

const HISTORY_DATA: History[] = [
	{id: 1, date: new Date(2018, 8, 1), action: "Edit", user: "Sergey Strovatikov", expandData: [
			{field: "Name", oldValue: "Anan", newValue: "Banan"}
		]},
	{id: 2, date: new Date(2018, 8, 1), action: "Edit", user: "Sergey Strovatikov", expandData: [
			{field: "Name", oldValue: "Anan", newValue: "Banan"}
		]},
	{id: 3, date: new Date(2018, 8, 1), action: "Edit", user: "Sergey Strovatikov", expandData: [
			{field: "Name", oldValue: "Anan", newValue: "Banan"}
		]},
	{id: 4, date: new Date(2018, 8, 1), action: "Edit", user: "Sergey Strovatikov", expandData: [
			{field: "Name", oldValue: "Anan", newValue: "Banan"}
		]},
	{id: 5, date: new Date(2018, 8, 1), action: "Edit", user: "Sergey Strovatikov", expandData: [
			{field: "Name", oldValue: "Anan", newValue: "Banan"}
		]},
];

@Component({
	selector: 'h21-profile-user-card',
	templateUrl: './h21-profile-user-card.component.html',
})

export class H21ProfileUserCardComponent {
	claimsDisplayedColumns: string[] = ['type', 'value'];
	claimsData = CLAIMS_DATA;
	foldersDisplayedColumns: string[] = ['name', 'permission', 'remove'];
	foldersData = FOLDERS_DATA;
	historyDisplayedColumns: string[] = ['expand', 'date', 'action', 'user'];
	historyExpandDisplayedColumns: string[] = ['blank', 'field', 'oldValue', 'newValue'];
	historyData = HISTORY_DATA;

	countriesData = COUNTRIES_DATA;
	citiesData = CITIES_DATA;
	codesData = CODES_DATA;


	// Form Controls
	emailControl = new FormControl('', [Validators.required, Validators.email]);
	firstNameControl = new FormControl('', [Validators.required]);
	lastNameControl = new FormControl('', [Validators.required]);
	countryControl = new FormControl();
	cityControl = new FormControl();
	codeControl = new FormControl();

	/** Expanded row element */
	historyExpandedElement: History;

	/** Editable mode option */
	@Input() editable: boolean;

	constructor() {
		this.editable = false;

		this.emailControl.setValue('banan@banancompany.com');
		this.firstNameControl.setValue('Banan');
		this.lastNameControl.setValue('Yellow');
		this.countryControl.setValue('Germany');
		this.cityControl.setValue('Berlin');
		this.codeControl.setValue('20000');
	}

	cancel() {

	}

	save() {

	}

	/**
	 * Returns a description of the generated FormControl validation error
	 * @param FormControl element
	 * @returns {string} Error message text
	 */
	getErrorMessage(control: any): string {
		return control.hasError('required') ? 'You must enter a value' :
			control.hasError('email') ? 'Not a valid email' : '';
	}

	removeFolderRow(id: number): void {

	}

	addNewFolderRow() {

	}
}
